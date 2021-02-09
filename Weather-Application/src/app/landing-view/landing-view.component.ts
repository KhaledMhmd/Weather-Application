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
  weatherDays: any;
  weatherDesc: string = '';
  currentDate: any;
  currentTime: any;

  constructor(
    private router: Router,
    private getLocationService: GetLocationService,
    private getWeatherService: GetWeatherService
  ) {}

  ngOnInit() {
    const today = new Date();
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    this.currentDate = new Intl.DateTimeFormat('en-US', options).format(today);

    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
    };
    this.currentTime = new Intl.DateTimeFormat('en-US', option).format(now);

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
                  this.weatherDesc = data.data.current_condition[0].weatherDesc[0].value.toUpperCase();
                  this.weatherDays = data.data.weather.map((x: any) => {
                    const container = {
                      day: '',
                      maxTemp: 3,
                      minTemp: 2,
                      weatherDescription: '',
                    };

                    const dayFormatted = new Date(x.date)
                      .toDateString()
                      .split(' ')[0];

                    container.day = dayFormatted;
                    container.maxTemp = x.maxtempC;
                    container.minTemp = x.mintempC;
                    container.weatherDescription =
                      x.hourly[6].weatherDesc[0].value;

                    return container;
                  });

                  this.date = data.data.time_zone[0].localtime;
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
