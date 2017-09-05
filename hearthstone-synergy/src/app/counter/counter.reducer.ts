import { Action } from '@ngrx/store'

import { Actions, ActionTypes } from './counter.actions'
import { CounterState, initialState } from './counter.state'

export function counterReducer(state: CounterState = initialState, action: Actions): CounterState {
    
    // it's possible to call imported reducers that modify state sequentually here
    
    switch (action.type) {
        case ActionTypes.INCREMENT:
            return {...state, counter: state.counter + action.payload };
        case ActionTypes.DECREMENT:
            return {...state, counter: state.counter - action.payload };
        default:
            return state;
    }
}
