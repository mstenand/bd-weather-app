import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { appReducer } from './store/app.reducer';
import { forecastFeature } from './store/forecast/forecast.reducer';
import { locationFeature } from './store/location/location.reducer';
import { AppEffects } from './store/app.effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { OverviewComponent } from './components/overview/overview.component';
import { GraphComponent } from './components/graph/graph.component';
import { DailyComponent } from './components/daily/daily.component';
import { WeeklyComponent } from './components/weekly/weekly.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewComponent,
    GraphComponent,
    DailyComponent,
    WeeklyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot(appReducer),
    StoreModule.forFeature(forecastFeature),
    StoreModule.forFeature(locationFeature),
    EffectsModule.forRoot(AppEffects),
    EffectsModule.forFeature()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
