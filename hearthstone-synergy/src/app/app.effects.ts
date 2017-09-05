import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AddTodoItemAction, ActionTypes } from './app.actions';

@Injectable()
export class AppEffects {

    constructor(private actions$: Actions) {}

    @Effect()
    addTodo$ = this.actions$.ofType<AddTodoItemAction>(ActionTypes.AddTodo)
        .map(action => action.payload)
        .do(payload => { console.log(payload) });
}