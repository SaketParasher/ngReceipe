import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReceipeComponent } from './receipe/receipe.component';
import { ReceipeListComponent } from './receipe/receipe-list/receipe-list.component';
import { ReceipeDetailComponent } from './receipe/receipe-detail/receipe-detail.component';
import { ReceipeItemComponent } from './receipe/receipe-list/receipe-item/receipe-item.component';
import { ShoppinglListComponent } from './shoppingl-list/shoppingl-list.component';
import { ShoppingEditComponent } from './shoppingl-list/shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReceipeComponent,
    ReceipeListComponent,
    ReceipeDetailComponent,
    ReceipeItemComponent,
    ShoppinglListComponent,
    ShoppingEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
