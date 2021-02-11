import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-error',
  templateUrl: './location-error.component.html',
  styleUrls: ['./location-error.component.css'],
})
export class LocationErrorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onGoBack() {
    this.router.navigate(['/']);
  }
}
