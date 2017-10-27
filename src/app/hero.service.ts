import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero } from "./heroes/hero";

@Injectable()
export class HeroService
{        
    private heroesUrl = 'api/heroes';  //URL to web api
    private headers = new Headers({'content-type':'application/json'});// The body content type (application/json) is identified in the request header.

    constructor(private http: Http){}

    getHeroes() : Promise<Hero[]> //stub
    {
        debugger;
        //http.get returns an RxJS Observable. Observables are a powerful way to manage asynchronous data flows
        return this.http.get(this.heroesUrl)
                    .toPromise()//, you've converted the Observable to a Promise using the toPromise operator.
                    .then(response => response.json().data as Hero[])//In the Promise's then() callback, you call the json method of the HTTP Response to extract the data within the response
                    .catch(this.handleError);
    } 
    
   getHero(id : number): Promise<Hero>
   {
       const url =`${this.heroesUrl}/${id}`;
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json().data as Hero)
                    .catch(this.handleError);
   }

   create(name: string): Promise<Hero> 
   {
        return this.http
                    .post(this.heroesUrl, JSON.stringify({name : name}), {headers : this.headers})
                    .toPromise()
                    .then(res => res.json().data as Hero)
                    .catch(this.handleError);
    }

   Update(hero: Hero): Promise<Hero>
   {
       const url = `${this.heroesUrl}/${hero.id}`;
       return this.http
                    .put(url, JSON.stringify(hero), {headers : this.headers})
                    .toPromise()
                    .then(() => hero)
                    .catch(this.handleError);
   } 
   
   delete(id: number): Promise<void> 
   {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> 
    {
        console.error('An error occurred ',error);  // for demo purposes only
        return Promise.reject(error.message || error );
    }
}
