import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ReceipeComponent } from "./receipe/receipe.component";
import { ReceipeListComponent } from "./receipe/receipe-list/receipe-list.component";
import { ReceipeDetailComponent } from "./receipe/receipe-detail/receipe-detail.component";
import { ReceipeItemComponent } from "./receipe/receipe-list/receipe-item/receipe-item.component";
import { ShoppinglListComponent } from "./shoppingl-list/shoppingl-list.component";
import { ShoppingEditComponent } from "./shoppingl-list/shopping-edit/shopping-edit.component";
import { HighlightDirective } from "./directives/highlight.directive";
import { BetteHighlightDirective } from "./directives/bette-highlight.directive";
import { ToggleDropdownDirective } from "./directives/toggle-dropdown.directive";

import { ReceipeService } from "./receipe/receipe.service";
import { ShoppingListService } from "./shoppingl-list/shopping-list.service";

import { AppRoutingModule } from "./app.routing.module";
import { NoreceipeComponent } from './receipe/receipe-detail/noreceipe/noreceipe.component';
import { ReceipeEditComponent } from './receipe/receipe-edit/receipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReceipeComponent,
    ReceipeListComponent,
    ReceipeDetailComponent,
    ReceipeItemComponent,
    ShoppinglListComponent,
    ShoppingEditComponent,
    HighlightDirective,
    BetteHighlightDirective,
    ToggleDropdownDirective,
    NoreceipeComponent,
    ReceipeEditComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [ReceipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
