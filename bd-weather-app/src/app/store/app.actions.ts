import { createAction } from '@ngrx/store';

const init = createAction(
    '[App Component] Initialized'
);

export const AppActions = {
    init
}
 