import { AppState, initialAppState } from './app.state';
import { Actions, AddTodoItemAction } from './app.actions';

import { counterReducer } from './counter';

export function appReducer(state = initialAppState, action: Actions): AppState {
    switch (action.type) {
        case AddTodoItemAction.TYPE:
            return {
                ...state,
                items: [...state.items, action.item],
                //itemForm: itemFormReducer(initialState.itemForm, { type: '' }),
            };

        default: {
            return state;
        }
  }
}

export const reducers = {
    app: appReducer,
    counter: counterReducer
};