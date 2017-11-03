import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Hero } from "../heroes/hero";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class HeroSearchService
{
    constructor (private http : Http){}
    search(term : string) : Observable<Hero[]> 
    {
        return this.http
                        .get('api/heroes/?name=${term}')
                        .map(response => response.json() as Hero[],
                        (err : HttpErrorResponse) =>{
                            if(err.error instanceof Error){
                                console.log("An Error Occurred: ",err.error.message)
                            }
                            else{
                                console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
                            }
                        }
                    );
    }
}
