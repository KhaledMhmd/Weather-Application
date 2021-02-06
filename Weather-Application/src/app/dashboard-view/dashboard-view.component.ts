import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
})
export class DashboardViewComponent implements OnInit {
  location: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.location = this.route.snapshot.params['city'];
  }
}
