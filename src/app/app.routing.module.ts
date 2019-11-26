import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceipeComponent } from "./receipe/receipe.component";
import { ShoppinglListComponent } from "./shoppingl-list/shoppingl-list.component";
import { ReceipeDetailComponent } from "./receipe/receipe-detail/receipe-detail.component";
import { NoreceipeComponent } from "./receipe/receipe-detail/noreceipe/noreceipe.component";
import { ReceipeEditComponent } from "./receipe/receipe-edit/receipe-edit.component";

import { ReceipeDataResolver } from './receipe/receipe.resolver';

const routes: Routes = [
  {
    path: "receipe",
    component: ReceipeComponent,
    resolve: { allRecipes: ReceipeDataResolver },
    children: [
      { path: "", component: NoreceipeComponent },
      { path: "new", component: ReceipeEditComponent },
      { path: ":id", component: ReceipeDetailComponent },
      { path: ":id/edit", component: ReceipeEditComponent },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  },

  { path: "shopping-list", component: ShoppinglListComponent },
  { path: "", redirectTo: "receipe", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
