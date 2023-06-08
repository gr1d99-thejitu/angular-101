import { Injectable } from '@angular/core';
import { Observable, of, catchError, map, tap } from "rxjs";
import  { HttpClient, HttpHeaders } from "@angular/common/http";

import { Hero } from "../app/heroes/hero";
import { NotificationsService } from "./notifications.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'
  constructor(
    private notificationsService: NotificationsService,
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error?.message ?? JSON.stringify(error)}`)
      return of(result as T)
    }
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('Fetched Heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched Hero Id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Update hero id=${hero.id}`)),
      catchError(this.handleError<any>('Update Hero'))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted Hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('Delete hero'))
    )
  }

  searchHeroes(term: string) {
    if (!term.trim()) {
      return of([])
    }

    const url = `${this.heroesUrl}/?name=${term}`

    return this.http.get<Hero[]>(url).pipe(
      tap(x => x.length ? this.log(`Found heroes matching "${term}"`) : this.log(`No heroes found matching ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }

  private log(message: string) {
    this.notificationsService.add(`HeroesService: ${message}`)
  }
}
