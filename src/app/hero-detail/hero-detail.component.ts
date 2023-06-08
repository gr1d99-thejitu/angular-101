import { Component, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { OnInit } from "@angular/core";

import { Hero } from "../heroes/hero";
import { HeroService } from "../../services/hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  constructor(private heroesService: HeroService,
              private route: ActivatedRoute,
              private location: Location
  ) {}

  hero?: Hero

  ngOnInit() {
    this.getHero()
  }

  getHero() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroesService.getHero(id).subscribe(hero => this.hero = hero)
  }

  goBack() {
    this.location.back()
  }

  save() {
    if (this.hero) {
      this.heroesService.updateHero(this.hero).subscribe(() => this.goBack())
    }
  }
}
