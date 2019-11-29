import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/receipe", pathMatch: "full" },
  // shopiing-list module is being lazt loaded
  { path: "shopping-list", loadChildren: './shopping-list.module#ShoppingListModule' },
  { path: "auth", loadChildren: './auth.module#AuthModule' }
  // { path: "receipe", loadChildren: './receipe.module#ReceipeModule' }
];

@NgModule({
  // PreloadAllModules is used to optimise the lazy loading so that all modules are loaded but are bundled seperatly
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


