import { createFeature, createReducer, on } from "@ngrx/store";
import { Forecast } from "src/app/models/forecast.model";
import { ForecastActions } from "./forecast.actions";

interface State {
    forecast: Forecast | undefined;
}

const initialState: State = {
    forecast: undefined
};

export const forecastFeature = createFeature({
    name: 'forecast',
    reducer: createReducer(
        initialState,

        on(ForecastActions.getYrForecastRequestSucces, (state, { forecast }) => ({
            ...state,
            forecast
        })),

        on(ForecastActions.getYrForecastRequestError, (state) => ({
            ...state,
            forecast: undefined
        }))
    )
});
