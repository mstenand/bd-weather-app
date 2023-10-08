/**
 * See https://api.met.no/weatherapi/locationforecast/2.0/documentation#!/data/get_compact for reference.
 */
export interface GetCompactResponse {
    type: string;
    geometry: Geometry;
    properties: Properties;
}

interface Geometry {
    type: string;
    coordinates: number[];
}

interface Properties {
    meta: Meta;
    timeseries: TimeData[];
}

interface Meta {
    updated_at: string;
    units: Units;
}

interface Units {
    air_pressure_at_sea_level: string;
    air_temperature: string;
    cloud_area_fraction: string;
    precipitation_amount: string;
    relative_humidity: string;
    wind_from_direction: string;
    wind_speed: string;
}

interface TimeData {
    time: string;
    data: Data;
}

interface Data {
    instant: Instant
    next_12_hours?: Next12Hours;
    next_1_hours?: NextHours;
    next_6_hours?: NextHours;
}

interface Instant {
    details: InstantDetails
}

interface InstantDetails {
    air_pressure_at_sea_level: number;
    air_temperature: number;
    cloud_area_fraction: number;
    relative_humidity: number;
    wind_from_direction: number;
    wind_speed: number;
}

export interface Next12Hours {
    summary: Summary;
}

export interface Summary {
    symbol_code: string;
}

export interface NextHours {
    summary: Summary;
    details: NextHoursDetails;
}

export interface NextHoursDetails {
    precipitation_amount: number;
}
