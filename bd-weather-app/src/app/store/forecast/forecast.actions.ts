import { createAction, props } from '@ngrx/store';
import { Forecast } from 'src/app/models/forecast.model';

const getYrForecastRequestSucces = createAction(
    '[Weather Service] Get Yr Forecast Request Succes',
    props<{ forecast: Forecast }>()
);

const getYrForecastRequestError = createAction(
    '[Weather Service] Get Yr Forecast Request Error'
)

export const ForecastActions = {
    getYrForecastRequestSucces,
    getYrForecastRequestError
}
 