import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingViewComponent,
    DashboardViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
