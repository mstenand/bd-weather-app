import { GetCompactResponse } from "../services/responses/yr.response";

export interface HourlyPoint {
    hour: number;
    value: number;
}

export interface DailyPoint {
    day: number,
    value: number
}

export enum WeekDay {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
}

export class Forecast {
    constructor(
        public readonly currentTemperature: number,
        public readonly currentPrecipitation: number,
        public readonly currentHumidity: number,
        public readonly currentWindSpeed: number,
        public readonly hourlyTemperature: HourlyPoint[],
        public readonly hourlyPrecipipation: HourlyPoint[],
        public readonly hourlyHumidity: HourlyPoint[],
        public readonly hourlyWindSpeed: HourlyPoint[],
        public readonly weeklyTemperature: DailyPoint[],
        public readonly weeklyPrecipitation: DailyPoint[],
        public readonly weeklyHumidity: DailyPoint[],
        public readonly weeklyWindSpeed: DailyPoint[]
    ) { }

    static adaptFromYrResponse(response: GetCompactResponse): Forecast {
        const currentTemperature: number = response.properties.timeseries[0].data.instant.details.air_temperature;
        const yrPrecipitation: number | undefined = response.properties.timeseries[0].data.next_1_hours?.details.precipitation_amount;
        const currentPrecipitation: number = yrPrecipitation ? yrPrecipitation : 0;
        const currentHumidity: number = response.properties.timeseries[0].data.instant.details.relative_humidity;
        const currentWindSpeed: number = response.properties.timeseries[0].data.instant.details.wind_speed;

        const maxHourlyIndex: number = response.properties.timeseries.length < 24 ? response.properties.timeseries.length : 24;
        const hourlyTemperature: HourlyPoint[] = response.properties.timeseries.slice(0, maxHourlyIndex).map(
            timeData => {
                return {
                    hour: new Date(timeData.time).getHours(),
                    value: timeData.data.instant.details.air_temperature
                };
            }
        );
        const hourlyPrecipipation: HourlyPoint[] = response.properties.timeseries.slice(0, maxHourlyIndex).map(
            timeData => {
                const yrHourlyPrecipitation: number | undefined = timeData.data.next_1_hours?.details.precipitation_amount;
                return {
                    hour: new Date(timeData.time).getHours(),
                    value: yrHourlyPrecipitation ? yrHourlyPrecipitation : 0
                };
            }
        );
        const hourlyHumidity: HourlyPoint[] = response.properties.timeseries.slice(0, maxHourlyIndex).map(
            timeData => {
                return {
                    hour: new Date(timeData.time).getHours(),
                    value: timeData.data.instant.details.relative_humidity
                };
            }
        );
        const hourlyWindSpeed: HourlyPoint[] = response.properties.timeseries.slice(0, maxHourlyIndex).map(
            timeData => {
                return {
                    hour: new Date(timeData.time).getHours(),
                    value: timeData.data.instant.details.relative_humidity
                };
            }
        );
        
        const initialDate: Date = new Date(response.properties.timeseries[0].time);
        const maxDate: Date = new Date(initialDate)
        maxDate.setDate(maxDate.getDate() + 7);
        maxDate.setHours(0, 0, 0, 0);
        const maxWeeklyIndex = response.properties.timeseries
            .filter(timeData => new Date(timeData.time) < maxDate)
            .length;

        const weeklyTemperature: DailyPoint[] = response.properties.timeseries.slice(0, maxWeeklyIndex)
            .reduce<{ day: number, accumulatedValue: number, count: number }[]>(
                (
                    accumulator,
                    currentValue
                ) => {
                    const day = new Date(currentValue.time).getDay();
                    const value = currentValue.data.instant.details.air_temperature;
                    const isDayInAccumulator = accumulator.find(e => e.day === day);
                    if (!isDayInAccumulator) {
                        accumulator.push({
                            day: day,
                            accumulatedValue: value,
                            count: 1
                        });
                    } else {
                        isDayInAccumulator.accumulatedValue += value;
                        isDayInAccumulator.count++;
                    }

                    return accumulator;
                }, []
            ).reduce<DailyPoint[]>(
                (
                    previousValue,
                    currentValue
                ) => {
                    previousValue.push({
                        day: currentValue.day,
                        value: currentValue.accumulatedValue / currentValue.count
                    })

                    return previousValue;
                }, []
            )
        
        const weeklyPrecipitation: DailyPoint[] = response.properties.timeseries.slice(0, maxWeeklyIndex)
            .reduce<{ day: number, accumulatedValue: number, count: number }[]>(
                (
                    accumulator,
                    currentValue
                ) => {
                    const day = new Date(currentValue.time).getDay();
                    const value = currentValue.data.next_1_hours?.details.precipitation_amount;
                    const isDayInAccumulator = accumulator.find(e => e.day === day);
                    if (!isDayInAccumulator) {
                        accumulator.push({
                            day: day,
                            accumulatedValue: value ? value : 0,
                            count: 1
                        });
                    } else {
                        isDayInAccumulator.accumulatedValue += value ? value : 0;
                        isDayInAccumulator.count++;
                    }

                    return accumulator;
                }, []
            ).reduce<DailyPoint[]>(
                (
                    previousValue,
                    currentValue
                ) => {
                    previousValue.push({
                        day: currentValue.day,
                        value: currentValue.accumulatedValue / currentValue.count
                    })

                    return previousValue;
                }, []
            )

        const weeklyHumidity: DailyPoint[] = response.properties.timeseries.slice(0, maxWeeklyIndex)
            .reduce<{ day: number, accumulatedValue: number, count: number }[]>(
                (
                    accumulator,
                    currentValue
                ) => {
                    const day = new Date(currentValue.time).getDay();
                    const value = currentValue.data.instant.details.relative_humidity;
                    const isDayInAccumulator = accumulator.find(e => e.day === day);
                    if (!isDayInAccumulator) {
                        accumulator.push({
                            day: day,
                            accumulatedValue: value,
                            count: 1
                        });
                    } else {
                        isDayInAccumulator.accumulatedValue += value;
                        isDayInAccumulator.count++;
                    }

                    return accumulator;
                }, []
            ).reduce<DailyPoint[]>(
                (
                    previousValue,
                    currentValue
                ) => {
                    previousValue.push({
                        day: currentValue.day,
                        value: currentValue.accumulatedValue / currentValue.count
                    })

                    return previousValue;
                }, []
            )

        const weeklyWindSpeed: DailyPoint[] = response.properties.timeseries.slice(0, maxWeeklyIndex)
            .reduce<{ day: number, accumulatedValue: number, count: number }[]>(
                (
                    accumulator,
                    currentValue
                ) => {
                    const day = new Date(currentValue.time).getDay();
                    const value = currentValue.data.instant.details.wind_speed;
                    const isDayInAccumulator = accumulator.find(e => e.day === day);
                    if (!isDayInAccumulator) {
                        accumulator.push({
                            day: day,
                            accumulatedValue: value,
                            count: 1
                        });
                    } else {
                        isDayInAccumulator.accumulatedValue += value;
                        isDayInAccumulator.count++;
                    }

                    return accumulator;
                }, []
            ).reduce<DailyPoint[]>(
                (
                    previousValue,
                    currentValue
                ) => {
                    previousValue.push({
                        day: currentValue.day,
                        value: currentValue.accumulatedValue / currentValue.count
                    })

                    return previousValue;
                }, []
            );

        return new Forecast(
            currentTemperature,
            currentPrecipitation,
            currentHumidity,
            currentWindSpeed,
            hourlyTemperature,
            hourlyPrecipipation,
            hourlyHumidity, 
            hourlyWindSpeed,
            weeklyTemperature,
            weeklyPrecipitation,
            weeklyHumidity,
            weeklyWindSpeed
        );
    } 
}
