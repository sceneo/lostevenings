import {Component, Inject, ViewChild} from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WorkEvent} from "../workevent/WorkEvent";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {Store} from "@ngrx/store";
import {WorkEventState} from "../../app.state";
import {addEvent, removeEvent} from "../workevent/workevent.actions";
import {getWorkEvents} from "../workevent/workevent.reducer";

export interface DialogData {
  workEvents: WorkEvent[];
}

@Component({
  selector: 'deleteevent',
  templateUrl: 'delete-event.component.html',
})
export class DeleteEventDialog {

  @ViewChild('workevents')
  selectionList: MatSelectionList | undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<DeleteEventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<WorkEventState>
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeSelectedEvents(): void {
    if (this.selectionList !== undefined) {
      const eventsToBeDeleted = this.selectionList.selectedOptions.selected.map(s => s.value);
      eventsToBeDeleted.forEach(evt => {
        this.store.dispatch(removeEvent({payload: evt}));
      })
    }
    this.dialogRef.close();
  }

}
