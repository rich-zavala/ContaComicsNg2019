import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatButtonToggleChange } from "@angular/material/button-toggle/typings/button-toggle";
import { CollectionService } from "src/app/services/collection.service";
import { ICCYear } from "src/models/year";

import * as lodash from "lodash";

@Component({
  selector: "app-years-listing",
  templateUrl: "./years-listing.component.html",
  styleUrls: ["./years-listing.component.less"]
})
export class YearsListingComponent implements OnInit {
  @Output() yearSelected = new EventEmitter<ICCYear>();
  years: ICCYear[] = [];
  selected: ICCYear;

  constructor(private db: CollectionService) {
    db.years.subscribe(d => {
      this.years = d;
      if (!lodash.isEmpty(d) && (!this.selected || !this.years.map(y => y.year).includes(this.selected.year))) {
        this.selected = lodash.first(this.years);
        this.emitYearSelection();
      }
    });
  }

  ngOnInit() {
  }

  private updateYearSelected($event: MatButtonToggleChange) {
    this.selected = $event.value;
    this.emitYearSelection();
  }

  private emitYearSelection() {
    this.yearSelected.emit(this.selected);
  }
}
