import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import {workEventReducer} from "./components/workevent/workevent.reducer";

export const reducers: ActionReducerMap<AppState> = {
  workEventState: workEventReducer
};
