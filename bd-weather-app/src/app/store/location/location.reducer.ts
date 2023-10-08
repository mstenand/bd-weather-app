import { createFeature, createReducer } from "@ngrx/store";

interface State {
    altitude: number | undefined;
    latitude: number;
    longitude: number;
}

const initialState: State = {
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
