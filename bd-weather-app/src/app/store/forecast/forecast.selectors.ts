import { createSelector } from "@ngrx/store";
import { WeeklyForecastData, forecastFeature } from "./forecast.reducer";

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

const selectWeeklyTemperature = createSelector(
    selectForecast,
    selectedForecast => selectedForecast?.weeklyTemperature
);

const selectWeeklyPrecipitation = createSelector(
    selectForecast,
    selectedForecast => selectedForecast?.weeklyPrecipitation
);

const selectWeeklyHumidity = createSelector(
    selectForecast,
    selectedForecast => selectedForecast?.weeklyHumidity
);

const selectWeeklyWindSpeed = createSelector(
    selectForecast,
    selectedForecast => selectedForecast?.weeklyWindSpeed
);

const selectWeeklyData = createSelector(
    selectWeeklyTemperature,
    selectWeeklyPrecipitation,
    selectWeeklyHumidity,
    selectWeeklyWindSpeed,
    ( temperature, precipitation, humidity, windSpeed ) => {
        if (!temperature) return undefined;
        if (!precipitation) return undefined;
        if (!humidity) return undefined;
        if (!windSpeed) return undefined;

        const data: WeeklyForecastData[] = [];
        for (let i = 0; i < temperature.length; i++) {
            data.push({
                day: temperature[i].day,
                temperature: temperature[i].value,
                precipitation: precipitation[i].value,
                humidity: humidity[i].value,
                windSpeed: windSpeed[i].value
            });
        }

        return data;
    }
);

export const fromForecast = {
    selectForecast,
    selectIsLoaded,
    selectCurrentTemperature,
    selectCurrentPrecipitation,
    selectCurrentHumidity,
    selectCurrentWindSpeed,
    selectWeeklyTemperature,
    selectWeeklyPrecipitation,
    selectWeeklyHumidity,
    selectWeeklyWindSpeed,
    selectWeeklyData
}
