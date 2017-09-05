import { Action } from '@ngrx/store';

import { TodoItem } from './app.state';

export const ActionTypes = {
    AddTodo: 'hs/app/ADD_TODO_ITEM'
}

export class AddTodoItemAction implements Action {
  static readonly TYPE = ActionTypes.AddTodo;
  readonly type = AddTodoItemAction.TYPE;

  constructor(public readonly item: TodoItem) { }
}

export type Actions =
    | AddTodoItemAction
    ;