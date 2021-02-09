import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { WeatherCardComponent } from './shared/weather-card/weather-card.component';
import { LocationErrorComponent } from './shared/location-error/location-error.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingViewComponent,
    DashboardViewComponent,
    WeatherCardComponent,
    LocationErrorComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
