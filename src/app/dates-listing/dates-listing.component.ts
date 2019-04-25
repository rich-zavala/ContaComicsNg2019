import { Component, OnInit } from "@angular/core";
import { ICCYear } from "src/models/year";
import { ICCDay } from "src/models/day";
import { CollectionService } from "../services/collection.service";

@Component({
  selector: "app-dates-listing",
  templateUrl: "./dates-listing.component.html",
  styleUrls: ["./dates-listing.component.less"]
})
export class DatesListingComponent implements OnInit {
  private yearSelected: ICCYear;
  private dates: ICCDay[];

  constructor(private db: CollectionService) {
    db.dates.subscribe(d => this.dates = d);
  }

  ngOnInit() {
  }

  private updateDaysListing($event: ICCYear) {
    this.dates = undefined;
    this.db.updateDates($event.year);
  }
}
