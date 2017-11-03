import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Use npm install --save @ng-bootstrap/ng-bootstrap to install

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Imports for loading & configuring the in-memory web api
// use npm install --save angular-in-memory-web-api for installing angular-in-memory-web-api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HeroService } from './services/hero.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataInterceptor } from './services/dataInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
     // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [,HeroService,
              {
                provide :HTTP_INTERCEPTORS,
                useClass: DataInterceptor,
                multi : true,
              }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
