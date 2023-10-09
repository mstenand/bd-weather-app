import { locationFeature } from "./location.reducer";

const {
    selectAltitude,
    selectLatitude,
    selectLongitude
} = locationFeature;

export const fromLocation = {
    selectAltitude,
    selectLatitude,
    selectLongitude
}
