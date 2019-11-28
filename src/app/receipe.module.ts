import { CommonModule } from '@angular/common';

import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ReceipeComponent } from "./receipe/receipe.component";
import { ReceipeListComponent } from "./receipe/receipe-list/receipe-list.component";
import { ReceipeDetailComponent } from "./receipe/receipe-detail/receipe-detail.component";
import { ReceipeItemComponent } from "./receipe/receipe-list/receipe-item/receipe-item.component";
import { ReceipeEditComponent } from './receipe/receipe-edit/receipe-edit.component';
import { NoreceipeComponent } from './receipe/receipe-detail/noreceipe/noreceipe.component';
import { ToggleDropdownDirective } from "./directives/toggle-dropdown.directive";

@NgModule({
  declarations: [
    ReceipeComponent,
    ReceipeListComponent,
    ReceipeDetailComponent,
    ReceipeItemComponent,
    ReceipeEditComponent,
    NoreceipeComponent,
    ToggleDropdownDirective
  ],
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  exports: [
  ]
})
export class ReceipeModule {

}
