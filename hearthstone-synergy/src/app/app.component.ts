import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import APP_CONFIG from './app.config';
import { RootState, TodoItem } from './app.state';
import { AddTodoItemAction } from './app.actions';

import { IncrementAction, DecrementAction } from './counter';
import { Node, Link } from './d3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  counter$: Observable<number>;
  items$: Observable<TodoItem[]>;

  private chartData: Array<any>;

  nodes: Node[] = [];
  links: Link[] = [];

  constructor(private store: Store<RootState>) {
    this.counter$ = store.select(s => s.counter.counter);
    this.items$ = store.select(s => s.app.items);

    this.generateGraphData();
  }

  increment() {
    this.store.dispatch(new IncrementAction(1));
  }

  decrement() {
    this.store.dispatch(new DecrementAction(1));
  }

  addTodoItem(item: TodoItem) {
    this.store.dispatch(new AddTodoItemAction(item));
  }

  ngOnInit() {
    this.generateData();
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([`Index ${i}`, Math.floor(Math.random() * 100)]);
    }
  }

  generateGraphData() {
    const N = APP_CONFIG.N;
    const getIndex = number => number - 1;

    // constructing the nodes array
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i))
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        // increasing connections toll on connecting nodes
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        // connecting the nodes before starting the simulation
        this.links.push(new Link(i, i * m));
      }
    }
  }
}
