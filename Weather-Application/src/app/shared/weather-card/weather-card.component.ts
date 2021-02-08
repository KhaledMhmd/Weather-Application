import { Component, OnInit } from '@angular/core';
import { GetLocationService } from 'src/app/get-location.service';
import { GetWeatherService } from 'src/app/get-weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
})
export class WeatherCardComponent implements OnInit {
  city: string = '';
  lat: any;
  lng: any;
  date: any;
  temp: any;
  altTemp: any;
  humidity: any;
  wind: any;
  weatherDesc: string = '';

  constructor(
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
              this.getWeatherService
                .onWeatherGet(this.city)
                .subscribe((data) => {
                  this.date = data.data.time_zone[0].localtime;
                  this.temp = data.data.current_condition[0].temp_C;
                  this.altTemp = data.data.current_condition[0].FeelsLikeC;
                  this.humidity = data.data.current_condition[0].humidity;
                  this.wind = data.data.current_condition[0].windspeedKmph;
                  this.weatherDesc =
                    data.data.current_condition[0].weatherDesc[0].value;
                });
            });
        },
        function () {
          alert('Could not get your current location');
        }
      );
  }
}
