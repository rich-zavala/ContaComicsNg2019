import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DbHandlingService } from "./services/db-handling.service";
import { AddFormModule } from "./add-form/add-form.module";
import { DatesListingModule } from "./dates-listing/dates-listing.module";
import { SeriesListingModule } from "./series-listing/series-listing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    AddFormModule,
    BrowserAnimationsModule,
    DatesListingModule,
    SeriesListingModule
  ],
  providers: [DbHandlingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
