/**
 * See https://api.met.no/weatherapi/locationforecast/2.0/documentation#!/data/get_compact for reference.
 */
export interface GetCompactRequest {
    /**
     * Whole meters above sealevel. 
     * OPTIONAL, but recommended for accuracy.
     */
    readonly altitude?: number;

    /**
     * Latitude
     */
    readonly lat: number;

    /**
     * Longitude
     */
    readonly lon: number;
}