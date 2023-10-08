import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { WeatherService } from "../services/weather.service";
import { AppActions } from "./app.actions";
import { fromLocation } from "./location/location.selectors";
import { ForecastActions } from "./forecast/forecast.actions";
import { Store } from "@ngrx/store";

@Injectable()
export class AppEffects {
    readonly loadWeather$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.init),
            concatLatestFrom(() => [
                this.store.select(fromLocation.selectAltitude),
                this.store.select(fromLocation.selectLatitude),
                this.store.select(fromLocation.selectLongitude)
            ]),
            switchMap(([_, altitude, latitude, longitude]) => this.weatherService.getForecast(latitude, longitude, altitude).pipe(
                map(bundles => ForecastActions.getYrForecastRequestSucces({ forecast: bundles })),
                catchError((_) => of(ForecastActions.getYrForecastRequestError())
            )))
        )
    );
 
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly weatherService: WeatherService
    ) { }
}
