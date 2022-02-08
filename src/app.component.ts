import {Component} from '@angular/core';
import {WorkeventService} from "./components/workevent/workevent.service";
import {WorkEvent} from "./components/workevent/WorkEvent";
import {TimerService} from "./timer/timer.service";
import {Observable, timer} from 'rxjs';
import {DeleteEventDialog} from "./components/deleteevent/delete-event.component";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {WorkEventState} from "./app.state";
import {getWorkEvents} from "./components/workevent/workevent.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  upcomingEvents$: Observable<WorkEvent[]>;
  events: WorkEvent[] = [];
  currentEvent: WorkEvent | undefined;
  remainingTime: number = 0;
  interval = 0;
  subscribeTimer: any;
  adminMenuActive: boolean = true;
  showAllDatasets: boolean = false;

  constructor(private workEventService: WorkeventService,
              private timerService: TimerService,
              public dialog: MatDialog,
              private store: Store<WorkEventState>
  ) {
    this.upcomingEvents$ = store.select(getWorkEvents);
    this.upcomingEvents$.subscribe(evts => {
      this.events = evts;
    });
    this.workEventService.createInitialSetOfUpcomingEvents();
    this.selectInitialEvent();
  }

  private selectInitialEvent(){
    if(this.events !== undefined) {
      this.selectCurrentEvent(this.events[0]);
    }
  }

  isAdminMenuActive(): boolean{
    return this.adminMenuActive;
  }

  getDisplayTime(time: number): string {
    return this.timerService.renderTimeFromNumber(time);
  }

  selectCurrentEvent(event: WorkEvent) {
    clearInterval(this.interval);
    if(event !== undefined) {
      this.remainingTime = this.timerService.getTimeUntil(event.date)
      this.currentEvent = event;
      this.startTimer();
    }
  }

  isDisabledButton(event: WorkEvent): boolean {
    return event.name === this.currentEvent?.name;
  }

  observableTimer() {
    const source = timer(1000, 2000);
    source.subscribe(val => {
      this.subscribeTimer = this.remainingTime - val;
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.remainingTime = 0;
      }
    }, 1000)
  }

  openDeleteEventDialog(): void {
    this.dialog.open(DeleteEventDialog, {
      data: {workEvents: this.events},
    });
  }

  showAll(): boolean {
    return this.showAllDatasets;
  }

  selectShowAll(): void {
    this.showAllDatasets = !this.showAllDatasets;
    if(this.showAllDatasets) {
      this.workEventService.showFullDataset();
    }
    else{
      this.workEventService.showReducedDataset();
      this.selectInitialEvent();
    }
  }
}
