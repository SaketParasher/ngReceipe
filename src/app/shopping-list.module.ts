import { NgModule } from "@angular/core";
// Instead of Common Module we will now use Shared Module as it also exports CommonModule
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppinglListComponent } from "./shoppingl-list/shoppingl-list.component";
import { ShoppingEditComponent } from "./shoppingl-list/shopping-edit/shopping-edit.component";


@NgModule({
  declarations: [
    ShoppinglListComponent,
    ShoppingEditComponent,
  ],
  imports: [FormsModule, SharedModule,
    RouterModule.forChild([{ path: "", component: ShoppinglListComponent }])
  ],
  exports: []
})
export class ShoppingListModule {

}
