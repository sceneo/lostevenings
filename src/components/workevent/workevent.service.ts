import {Injectable} from "@angular/core";
import {WorkEvent} from "./WorkEvent";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {WorkEventState} from "../../app.state";
import {getWorkEvents} from "./workevent.reducer";
import {addEvent, clearEvents} from "./workevent.actions";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class WorkeventService {
  upcomingEvents$: Observable<WorkEvent[]>;
  upcomingEvents: WorkEvent[] = [];

  constructor(private store: Store<WorkEventState>) {
    this.upcomingEvents$ = store.select(getWorkEvents);
    this.upcomingEvents$.subscribe(events => {
      this.upcomingEvents = events;
    });
  }

  getEvents(): WorkEvent[] {
    return this.upcomingEvents;
  }

  createInitialSetOfUpcomingEvents(): void {
    this.createEvent("Lost Evenings V", "music_note", Date.parse("15 Sep 2022 20:00:00 GMT"));
  }

  private createEvent(name: string, icon: string, date: number) {
    this.store.dispatch(addEvent({
      payload: {
        name,
        icon,
        date
      }
    }));
  }

  private clearAllEvents() {
    this.store.dispatch(clearEvents());
  }

  showFullDataset() {
    this.clearAllEvents();
    this.importLocalData();
    this.createEvent("Lost Evenings V", "music_note", Date.parse("15 Sep 2022 20:00:00 GMT"));
    this.createEvent("Swiss Ski Event", "downhill_skiing", Date.parse("26 Mar 2022 08:00:00 GMT"));
    this.createEvent("Christmas Party", "park", Date.parse("11 Feb 2022 18:00:00 GMT"));
    this.createEvent("Christmas", "park", Date.parse("24 Dec 2022 00:00:00 GMT"));
    this.createEvent("Birthday", "cake", Date.parse("01 Apr 2022 00:00:00 GMT"));
  }

  showReducedDataset() {
    this.clearAllEvents();
    this.createInitialSetOfUpcomingEvents();
  }

  importLocalData() {
    this.readFile();
  }


  readFile(){
    fetch('./shows.json')
      .then(response => response.text())
      .then(data => {
        // Do something with your data
        console.log(data);
      });
  }
}
