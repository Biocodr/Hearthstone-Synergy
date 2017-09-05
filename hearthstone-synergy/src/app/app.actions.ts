import { Action } from '@ngrx/store';

import { TodoItem } from './app.state';

export const ActionTypes = {
    AddTodo: 'hs/app/ADD_TODO_ITEM'
}

export class AddTodoItemAction implements Action {
  static readonly TYPE = ActionTypes.AddTodo;
  readonly type = AddTodoItemAction.TYPE;
  readonly payload: TodoItem;

  constructor(public readonly item: TodoItem) { 
      this.payload = item;
  }
}

export type Actions =
    | AddTodoItemAction
    ;