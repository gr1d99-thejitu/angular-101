import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs";

import { Hero } from "../heroes/hero";
import { HeroService } from "../../services/hero.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  heroes$!: Observable<Hero[]>

  private searchTerms = new Subject<string>()
  search(term: string) {
    this.searchTerms.next(term)
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }
}
