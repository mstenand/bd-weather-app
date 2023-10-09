import { NgModule } from '@angular/core';
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
import { WeeklyComponent } from './components/weekly/weekly.component';
import { HourlyComponent } from './components/hourly/hourly.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewComponent,
    GraphComponent,
    WeeklyComponent,
    HourlyComponent
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
