import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../heroes/hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes : Hero[]=[];   //Define a heroes array property.
  constructor(private heroService : HeroService) { } //Inject the HeroService in the constructor and hold it in a private heroService field.

  ngOnInit(): void 
  {
    //Call the service to get heroes inside the Angular ngOnInit() lifecycle hook.
      this.heroService.getHeroes()
                          .then(heroes => this.heroes = heroes.slice(1,5));
                      // .then(heroes => this.heroes = heroes.slice(1,5));
      //you specify four heroes (2nd, 3rd, 4th, and 5th) with the Array.slice method.
  }

}
  