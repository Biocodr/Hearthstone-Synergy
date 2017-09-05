import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { RootState, TodoItem } from './app.state';
import { AddTodoItemAction } from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  items$: Observable<TodoItem[]>;

  constructor(private store: Store<RootState>) {
    this.items$ = store.select(s => s.app.items);
  }

  addTodoItem(item: TodoItem) {
    this.store.dispatch(new AddTodoItemAction(item));
  }
}
