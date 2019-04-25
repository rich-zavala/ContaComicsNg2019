import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordRowComponent } from "./record-row.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RecordRowComponent
  ],
  exports: [
    RecordRowComponent
  ]
})
export class RecordRowModule { }
