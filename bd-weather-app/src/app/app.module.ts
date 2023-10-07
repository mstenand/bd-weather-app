import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './header/header.component';
import { OverviewComponent } from './overview/overview.component';
import { GraphComponent } from './graph/graph.component';
import { DailyComponent } from './daily/daily.component';
import { WeeklyComponent } from './weekly/weekly.component';

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
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
