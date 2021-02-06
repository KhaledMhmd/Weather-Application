import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.css'],
})
export class LandingViewComponent implements OnInit {
  location: string = 'Cairo, Egypt';

  constructor(private router: Router) {}

  ngOnInit() {}

  onLocationRequest() {
    this.router.navigate(['/more/Cairo']);
  }
}
