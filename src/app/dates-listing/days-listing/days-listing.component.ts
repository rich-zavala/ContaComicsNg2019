import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CollectionService } from "src/app/services/collection.service";
import { ICCDay } from "src/models/day";
import { ICCRecord } from "src/models/record";

@Component({
  selector: "app-days-listing",
  templateUrl: "./days-listing.component.html",
  styleUrls: ["./days-listing.component.less"]
})
export class DaysListingComponent implements OnInit {
  @Input() day: ICCDay;
  @Output() recordDeleted: EventEmitter<ICCRecord>;

  private records: ICCRecord[] = [];

  constructor(private db: CollectionService) {
  }

  ngOnInit() {
    this.db.getRecordsByDate(this.day.date)
      .subscribe(d => this.records = d);
  }

}
