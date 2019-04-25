import { Component } from "@angular/core";
import * as Rx from "rxjs";
import { toArray } from "rxjs/operators";
import * as lodash from "lodash";

import { DbHandlingService } from "./services/db-handling.service";
import { CCRecord } from "src/models/record";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  constructor(db: DbHandlingService) {
    const data = [{
      title: "Spider Man",
      price: 26,
      publishDate: 1558622522000,
      volume: 59
    },
    {
      title: "Dragon Ball",
      price: 110,
      publishDate: 1558622522000,
      volume: 6
    },
    {
      title: "Spider Man",
      price: 26,
      publishDate: 1546699322000,
      volume: 58
    },
    {
      title: "Spider Man",
      price: 26,
      publishDate: 1543730400000,
      volume: 60
    },
    {
      title: "Invincible",
      price: 180,
      publishDate: 1546668000000,
      volume: 2
    },
    {
      title: "Invincible",
      price: 180,
      publishDate: Date.now(),
      volume: 3
    },
    {
      title: "Spawn",
      price: 32,
      publishDate: 1548655200000,
      volume: 1
    }];

    /*
    let records: CCRecord[];
    Rx.concat(...data.map(d => db.db.insert(d)))
      .pipe(toArray())
      .subscribe(res => {
        console.log("Insert result:", res);
        records = res.map(r => r.record);
      });

    setTimeout(() => {
      db.db.getYears()
        .subscribe(years => {
          years.forEach(year => {
            db.db.getDays(year.year)
              .subscribe(
                yearData => console.log("Days in year " + year.year, yearData)
              );
          });
        });
    }, 500);

    setTimeout(() => {
      const record = lodash.sample(records);
      // const record = records.find(r => r.id === "SpiderMan58");
      console.log("Deleting", record.id, record);
      db.db.delete(record)
        .subscribe(
          x => console.log("DelRes", x)
        );
    }, 2000);
    */
  }
}
