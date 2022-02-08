import { createAction, props } from '@ngrx/store';
import {WorkEvent} from "./WorkEvent";

export const removeEvent =
  createAction('[ WorkEvent ] Remove Event', props<{ payload: string }>());

export const addEvent =
  createAction('[ WorkEvent ] Add Event', props<{ payload: WorkEvent }>());

export const clearEvents =
  createAction('[ WorkEvent ] Clear Events');
