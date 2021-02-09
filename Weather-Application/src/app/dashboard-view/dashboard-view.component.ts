import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
})
export class DashboardViewComponent implements OnInit {
  location: string = '';
  model: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const locationSmall = this.route.snapshot.params['city'];
    this.location =
      locationSmall.charAt(0).toUpperCase() + locationSmall.slice(1);
  }
}
