import { Component, OnInit } from '@angular/core';
import {HeroService} from "../../services/hero.service";
import {Hero} from "../heroes/hero";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private heroesService: HeroService) {
  }

  heroes: Hero[] = []
  ngOnInit() {
    this.heroesService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }
}
