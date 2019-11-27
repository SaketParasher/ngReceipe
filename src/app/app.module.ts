import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

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
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingspinnerComponent } from './shared/loadingspinner/loadingspinner.component';
import { AuthInterceptor } from './auth/auth/auth-interceptors.service';
import { AuthGuardService } from './auth/auth/auth.guard';

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
    ReceipeEditComponent,
    AuthComponent,
    LoadingspinnerComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [ReceipeService, ShoppingListService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
