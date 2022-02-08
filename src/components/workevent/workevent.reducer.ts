import {createFeatureSelector, createSelector, createReducer, on, Action} from '@ngrx/store';
import {WorkEventState} from "../../app.state";
import {addEvent, clearEvents, removeEvent} from "./workevent.actions";
import {WorkEvent} from "./WorkEvent";

export const initialState: WorkEventState = {workEvents: []};

const _workEventReducer = createReducer(
  initialState,
  on(removeEvent, (state, {payload}) => {
    const events = [...state.workEvents];
    return {...state, workEvents: events.filter( evt => {
        return !evt.name.includes(payload);
      })};
  }),
  on(addEvent, (state, {payload}) => {
    const events = [...state.workEvents, payload];
    return {...state, workEvents: events };
  }),
  on(clearEvents, (state) => {
    return {...state, workEvents: []}
  }),
);

export function workEventReducer(state: any, action: Action) {
  return _workEventReducer(state, action);
}

export const getWorkEventState = createFeatureSelector<WorkEventState>('workEventState');

export const getWorkEvents = createSelector(
  getWorkEventState,
  (state: WorkEventState) => state.workEvents
);

