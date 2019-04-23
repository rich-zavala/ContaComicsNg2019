import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { DATE_FORMAT } from "src/constants/formats";
import { DbHandlingService } from "../services/db-handling.service";

import * as moment from "moment";

@Component({
  selector: "app-add-form",
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.less"]
})
export class AddFormComponent implements OnInit {
  ccRecordForm = new FormGroup({
    title: new FormControl("", Validators.required),
    volume: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    variant: new FormControl(""),
    checked: new FormControl(false),
    publishDate: new FormControl(moment().format(DATE_FORMAT), Validators.required)
  });

  titles: string[] = [];
  filteredTitles: Observable<string[]>;

  constructor(private db: DbHandlingService, private snackBar: MatSnackBar) {
    db.db.getSeries()
      .subscribe(
        titles => this.titles = titles
      );
  }

  ngOnInit() {
    this.filteredTitles = this.ccRecordForm.controls.title.valueChanges
      .pipe(
        startWith(""),
        map(value => this.filterTitles(value))
      );
  }

  private filterTitles(value: string): string[] {
    if (value.length < 4) { // Three characters minimum
      return [];
    }

    const filterValue = value.toLowerCase();
    return this.titles.filter(option => option.toLowerCase().includes(filterValue));
  }

  private onSubmit() {
    this.db.db.insert(this.ccRecordForm.value)
      .subscribe(
        res => this.snackBar.open(`${res.record.title} #${res.record.volume} is part of the collection!`, "Close", { duration: 2000 })
      );
  }
}
