import { createFeature, createReducer } from "@ngrx/store";

export interface State {
    altitude: number;
    latitude: number;
    longitude: number;
}

export const initialState: State = {
    altitude: 13,
    latitude: 56.1518,
    longitude: 10.2064
};

export const locationFeature = createFeature({
    name: 'location',
    reducer: createReducer(
        initialState,
    )
});
