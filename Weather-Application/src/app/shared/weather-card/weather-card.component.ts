import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GetLocationService } from 'src/app/get-location.service';
import { GetWeatherService } from 'src/app/get-weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
})
export class WeatherCardComponent implements OnInit {
  @ViewChild('dateInput', { static: false }) dateInputRef?: ElementRef;
  city: string = '';

  lat: any;
  lng: any;
  date: any;
  temp: any;
  altTemp: any;
  humidity: any;
  wind: any;
  weatherDesc: string = '';
  hWeatherDesc: string = '';
  hTemp: any;
  hAltTemp: any;
  hHumidity: any;
  hWind: any;
  isDashboardView: boolean = false;
  today: any = new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
    .format(new Date())
    .replace('/', '-')
    .replace('/', '-');

  options: {} = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  datePicked: any = new Intl.DateTimeFormat('en-US', this.options).format(
    new Date()
  );

  datePassed: any;

  isDatePicked: boolean = false;

  isErrorFound: boolean = false;

  constructor(
    private getLocationService: GetLocationService,
    private getWeatherService: GetWeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.routeConfig?.path?.includes('more')) {
      this.isDashboardView = true;
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.city = params.get('city') || '';
      });
    }
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.getLocationService
            .onLocationGet(this.lat, this.lng)
            .subscribe((data) => {
              const topLocation = data.search_api.result[0];
              if (!this.isDashboardView) {
                this.city = topLocation.region[0].value;
              }

              this.getWeatherService
                .onWeatherGet(this.city)
                .subscribe((data) => {
                  const topLoca = data.data.current_condition[0];

                  this.date = data.data.time_zone[0].localtime;
                  this.temp = topLoca.temp_C;
                  this.altTemp = topLoca.FeelsLikeC;
                  this.humidity = topLoca.humidity;
                  this.wind = topLoca.windspeedKmph;
                  this.weatherDesc = topLoca.weatherDesc[0].value;
                });
            });
        },
        () => {
          this.router.navigate(['/location-error']);
        }
      );
  }

  onDatePicked() {
    this.isDatePicked = true;
    const date = this.dateInputRef?.nativeElement.value;

    const day = new Date(date);

    this.datePicked = new Intl.DateTimeFormat('en-US', this.options).format(
      day
    );
    this.datePassed = new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
      .format(day)
      .replace('/', '-')
      .replace('/', '-');

    this.getWeatherService
      .onHistoricalGet(this.city, this.datePassed)
      .subscribe((data) => {
        const topLoc = data.data.weather[0].hourly[6];
        this.hWeatherDesc = topLoc.weatherDesc[0].value;
        this.hWind = topLoc.windspeedKmph;
        this.hTemp = topLoc.tempC;
        this.hHumidity = topLoc.humidity;
        this.hAltTemp = topLoc.FeelsLikeC;
      });
  }
}
