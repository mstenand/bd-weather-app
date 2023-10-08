import { createSelector } from "@ngrx/store";
import { forecastFeature } from "./forecast.reducer"; 

const {
    selectForecast,
    selectIsLoaded
} = forecastFeature;

const selectCurrentTemperature = createSelector(
    selectForecast,
    selectedForecast => selectedForecast?.currentTemperature
);

const selectCurrentPrecipitation = createSelector(
    selectForecast,
    selectedForecast => selectedForecast?.currentPrecipitation
);

const selectCurrentHumidity = createSelector(
    selectForecast,
    selectedForecast => selectedForecast?.currentPrecipitation
);

const selectCurrentWindSpeed = createSelector(
    selectForecast,
    selectedForecast => selectedForecast?.currentWindSpeed
);

export const fromForecast = {
    selectForecast,
    selectIsLoaded,
    selectCurrentTemperature,
    selectCurrentPrecipitation,
    selectCurrentHumidity,
    selectCurrentWindSpeed
}
