import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetLocationService } from '../get-location.service';
import { GetWeatherService } from '../get-weather.service';

@Component({
  selector: 'app-landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.css'],
})
export class LandingViewComponent implements OnInit {
  city: string = '';
  country: string = '';
  lat: any;
  lng: any;
  date: any;
  highTemp: any;
  lowTemp: any;

  constructor(
    private router: Router,
    private getLocationService: GetLocationService,
    private getWeatherService: GetWeatherService
  ) {}

  ngOnInit() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.getLocationService
            .onLocationGet(this.lat, this.lng)
            .subscribe((data) => {
              const topLocation = data.search_api.result[0];
              this.city = topLocation.region[0].value;
              this.country = topLocation.country[0].value;
              this.getWeatherService
                .onWeatherGet(this.city)
                .subscribe((data) => {
                  this.highTemp = data.data.weather[0].maxtempC;
                  this.lowTemp = data.data.weather[0].mintempC;
                  this.date = data.data.time_zone[0].localtime;
                  console.log(this.date);
                });
            });
        },
        function () {
          alert('Could not get your current location');
        }
      );
  }
  onLocationRequest() {
    this.router.navigate(['/more/' + this.city]);
  }
}

// //                  this.date = data.data.time_zone[0].localtime
// .replaceAll('-', ' ')
// .replaceAll(':', ' ')
// .split(' ');
