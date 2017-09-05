import { Action } from '@ngrx/store';

export const ActionTypes = {
    INCREMENT: 'hs/counter/INCREMENT',
    DECREMENT: 'hs/counter/DECREMENT'
};

export class IncrementAction implements Action {
    static readonly TYPE = ActionTypes.INCREMENT;
    readonly type = IncrementAction.TYPE;

    constructor(public payload: number) {

    }
}

export class DecrementAction implements Action {
    static readonly TYPE = ActionTypes.DECREMENT;
    readonly type = DecrementAction.TYPE;

    constructor(public payload: number) {

    }
}

export type Actions
    = IncrementAction
    | DecrementAction;