import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetWeatherService {
  weatherUrl: string =
    'http://api.worldweatheronline.com/premium/v1/weather.ashx?key=aac8fe34bcf34541a26151052210602&q=';

  historicalUrl: string =
    'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=aac8fe34bcf34541a26151052210602&q=';

  url: string = '';
  constructor(private http: HttpClient) {}

  onWeatherGet(city: string): Observable<any> {
    return this.http.get<any>(
      this.weatherUrl + city + '&format=json&num_of_days=7&showlocaltime=yes'
    );
  }
  onHistoricalGet(city: string, date: string): Observable<any> {
    return this.http.get<any>(
      (this.url = this.historicalUrl + city + '&format=json&date=' + date)
    );
  }
}
