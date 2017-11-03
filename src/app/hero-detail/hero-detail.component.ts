import { Component, OnInit } from '@angular/core';//amend the @angular/core import statement to include the Input symbol. 
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Hero } from '../heroes/hero';
import { HeroService } from '../services/hero.service';

@Component({
    selector:'hero-detail',
    templateUrl:'hero-detail.component.html',
    styleUrls: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit
{
  hero : Hero;
  constructor(private heroService: HeroService,
        private route : ActivatedRoute,
        private location : Location            
      ){}
    ngOnInit(): void {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
        .subscribe(hero => this.hero = hero);
    }
    save(): void
    {
      this.heroService.Update(this.hero)
          .then(() => this.goBack());
    }

    goBack(): void
    {
        this.location.back();
    }
  
 
  // must declare a target binding property to be an input property. Otherwise, Angular rejects the binding and 
  // throws an error.
  // declare that hero is an input property by preceding it with the @Input decorator that you imported earlier
  //  @Input() hero : Hero;
  //  All it does is receive a hero object through its hero input property and then bind to that property with
  // its template.
}