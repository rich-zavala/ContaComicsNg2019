import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordRowModule } from "../record-row/record-row.module";
import { SeriesListingComponent } from "./series-listing.component";

@NgModule({
  declarations: [
    SeriesListingComponent
  ],
  imports: [
    CommonModule,
    RecordRowModule
  ],
  exports: [
    SeriesListingComponent
  ],
  entryComponents: [
    SeriesListingComponent
  ]
})
export class SeriesListingModule { }
