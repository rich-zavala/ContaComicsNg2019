import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { DbHandlingService } from "../services/db-handling.service";
import { AddFormComponent } from "./add-form.component";

@NgModule({
  declarations: [AddFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [
    DbHandlingService
  ],
  exports: [AddFormComponent],
  entryComponents: [AddFormComponent]
})
export class AddFormModule { }
