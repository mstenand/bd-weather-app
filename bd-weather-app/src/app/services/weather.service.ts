import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GetCompactResponse } from './responses/yr.response';
import { Forecast } from '../models/forecast.model';
import { GetCompactRequest } from './request/yr.request';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly yrUrl = 'http://localhost:3000/yr-forecast';

  constructor(private readonly http: HttpClient) { }

  public getForecast(latitude: number, longitude: number, altitude?: number): Observable<Forecast> {
    return this.getYrForecast({ altitude: altitude, lat: latitude, lon: longitude });
  }

  private getYrForecast(request: GetCompactRequest): Observable<Forecast> {
    let params: HttpParams = new HttpParams();
    if (request.altitude !== undefined) params = params.append('altitude', request.altitude.toString());
    params = params.append('lat', request.lat.toString());
    params = params.append('lon', request.lat.toString());
    
    return this.http.get<GetCompactResponse>(this.yrUrl, { params: params })
      .pipe(
        map(response => Forecast.adaptFromYrResponse(response)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('Error: ', error);
    return throwError(() => new Error('An error occurred!'));
  }
}
