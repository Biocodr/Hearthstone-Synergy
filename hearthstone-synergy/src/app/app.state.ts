import { CounterState } from './counter';

export class TodoItem {
  readonly category: 'Private' | 'Work';
  readonly text: string;
  readonly meta: {
    readonly priority: number;
    readonly duedate: string;
  };
}

export interface AppState {
    items: TodoItem[];
}

export const initialAppState: AppState = {
    items: []
};

export interface RootState {
  app: AppState;
  counter: CounterState;
}