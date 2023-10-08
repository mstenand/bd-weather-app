import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromForecast } from 'src/app/store/forecast/forecast.selectors';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  readonly currentDate: Date = new Date();
  readonly temperature$ = this.store.select(fromForecast.selectCurrentTemperature);
  readonly precipitation$ = this.store.select(fromForecast.selectCurrentPrecipitation);
  readonly humidity$ = this.store.select(fromForecast.selectCurrentHumidity);
  readonly windSpeed$ = this.store.select(fromForecast.selectCurrentWindSpeed);

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
  }

}
