import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

import { RecordRowModule } from "../record-row/record-row.module";

import { YearsListingComponent } from "./years-listing/years-listing.component";
import { DayRecordsListingComponent } from "./day-records-listing/day-records-listing.component";
import { DatesListingComponent } from "./dates-listing.component";

import { CollectionService } from "../services/collection.service";

@NgModule({
  imports: [
    CommonModule,
    MatButtonToggleModule,
    RecordRowModule
  ],
  declarations: [
    YearsListingComponent,
    DayRecordsListingComponent,
    DatesListingComponent
  ],
  exports: [
    DatesListingComponent
  ],
  providers: [
    CollectionService
  ],
  entryComponents: [
    DatesListingComponent
  ]
})
export class DatesListingModule { }
