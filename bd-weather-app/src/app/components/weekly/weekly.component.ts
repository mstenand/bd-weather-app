import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromForecast } from 'src/app/store/forecast/forecast.selectors';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {
  readonly weekDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  readonly weeklyForecastData$ = this.store.select(fromForecast.selectWeeklyData);

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
  }

}
