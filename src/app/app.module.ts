import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DbHandlingService } from "./services/db-handling.service";
import { AddFormModule } from "./add-form/add-form.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddFormModule,
    BrowserAnimationsModule
  ],
  providers: [DbHandlingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
