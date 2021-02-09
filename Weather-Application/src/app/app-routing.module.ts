import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { LocationErrorComponent } from './shared/location-error/location-error.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: 'more/:city', component: DashboardViewComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'location-error', component: LocationErrorComponent },
  { path: '', component: LandingViewComponent },
  { path: '**', component: LandingViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
