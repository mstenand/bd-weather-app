import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from './store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bd-weather-app';

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(AppActions.init());
  }
}
