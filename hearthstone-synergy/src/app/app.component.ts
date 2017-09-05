import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
export class AppComponent implements OnInit {
  items$: Observable<TodoItem[]>;

  private graphData: Array<any>;

  constructor(private store: Store<RootState>) {
    this.items$ = store.select(s => s.app.items);
  }

  addTodoItem(item: TodoItem) {
    this.store.dispatch(new AddTodoItemAction(item));
  }

  ngOnInit() {
    this.generateData();
  }

  generateData() {
    this.graphData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.graphData.push([`Index ${i}`, Math.floor(Math.random() * 100)]);
    }
  }
}
