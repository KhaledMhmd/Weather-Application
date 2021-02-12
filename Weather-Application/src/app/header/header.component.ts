import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  country: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}
  onSearch(city: string) {
    this.router.navigate(['/more/' + city]);
  }
}
