import { createFeature, createReducer, on } from "@ngrx/store";
import { Forecast } from "src/app/models/forecast.model";
import { ForecastActions } from "./forecast.actions";

interface State {
    forecast: Forecast | undefined;
    isLoaded: boolean;
}

const initialState: State = {
    forecast: undefined,
    isLoaded: false
};

export interface WeeklyForecastData {
    day: number;
    temperature: number;
    precipitation: number;
    humidity: number;
    windSpeed: number;
}

export const forecastFeature = createFeature({
    name: 'forecast',
    reducer: createReducer(
        initialState,

        on(ForecastActions.getYrForecastRequestSucces, (state, { forecast }) => ({
            ...state,
            forecast,
            isLoaded: true
        })),

        on(ForecastActions.getYrForecastRequestError, (state) => ({
            ...state,
            forecast: undefined,
            isLoaded: false
        }))
    )
});
