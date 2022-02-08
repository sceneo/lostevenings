import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DeleteEventDialog} from "./components/deleteevent/delete-event.component";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule, MatSelectionList} from "@angular/material/list";
import {WorkeventComponent} from './components/workevent/workevent.component';
import {StoreModule} from "@ngrx/store";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {reducers} from "./app.reducers";

@NgModule({
  declarations: [
    AppComponent,
    DeleteEventDialog,
    WorkeventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    OverlayModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    StoreModule.forRoot(reducers),
    MatInputModule,
    MatMenuModule
  ],
  providers: [MatDialog, MatSelectionList],
  bootstrap: [AppComponent]
})
export class AppModule {
}
