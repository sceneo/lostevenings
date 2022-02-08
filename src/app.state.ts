import {WorkEvent} from "./components/workevent/WorkEvent";

export interface AppState {
  workEventState: WorkEventState;
}
export interface WorkEventState {
  workEvents: WorkEvent[];
}
