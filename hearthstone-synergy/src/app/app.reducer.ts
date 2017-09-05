import { AppState, initialState } from './app.state';
import { Actions, AddTodoItemAction } from './app.actions';

export function appReducer(state = initialState, action: Actions): AppState {
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
    app: appReducer
};