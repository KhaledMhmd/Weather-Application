import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  country: string = '';
  theme: string = localStorage.getItem('theme') || 'light';

  constructor(private router: Router) {}

  ngOnInit() {}
  onSearch(city: string) {
    this.router.navigate(['/more/' + city]);
  }
  onChangeTheme() {
    if (this.theme === 'light') {
      localStorage.setItem('theme', 'dark');
      this.theme = 'dark';
    } else if (this.theme === 'dark') {
      localStorage.setItem('theme', 'light');
      this.theme = 'light';
    }
    location.reload();
  }
}
