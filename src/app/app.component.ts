import { Component } from "@angular/core";
import { DbHandlingService } from './db-handling.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  title = "NgCC2019";

  constructor(db: DbHandlingService) {
    db.db.insert({
      title: "Spider Man",
      price: 26,
      volume: 59
    }).subscribe(
      x => console.log("x", x),
      y => console.log("y", y)
    );
  }
}
