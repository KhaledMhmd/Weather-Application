import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetLocationService {
  weatherUrl: string =
    'http://api.worldweatheronline.com/premium/v1/search.ashx?key=aac8fe34bcf34541a26151052210602&q=';

  constructor(private http: HttpClient) {}

  onLocationGet(lat: number, lng: number): Observable<any> {
    return this.http.get<any>(
      this.weatherUrl + lat + ',' + lng + '&format=json'
    );
  }
}
