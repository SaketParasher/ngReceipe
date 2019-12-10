import { Component, OnInit, DoCheck, OnDestroy } from "@angular/core";
import { Ingrediant } from "../shared/ingrediant.model";

import { ShoppingListService } from "./shopping-list.service";

import { Subscription, Observable } from "rxjs";

// NGRX STORE IMPORTS
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';

@Component({
  selector: "app-shoppingl-list",
  templateUrl: "./shoppingl-list.component.html",
  styleUrls: ["./shoppingl-list.component.css"]
  //providers: [ShoppingListService]
})
export class ShoppinglListComponent implements OnInit, OnDestroy {
  //ingrediants: Ingrediant[];
  //ingrediantsSubscription: Subscription;
  ingrediants: Observable<{ ingrediants: Ingrediant[] }>;

  constructor(private shoppingSVC: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    // Now we are fetching shopping-list from store
    this.ingrediants = this.store.select('shoppingList')

    // // this is to get ingrediants when this component is initialized
    // this.ingrediants = this.shoppingSVC.getIngrediants();

    // // this is to get get the ingrediants when an ingrediant or array of ingrediants are added
    // this.ingrediantsSubscription = this.shoppingSVC.emitIngrediants.subscribe(ingreddiantsArr => {
    //   this.ingrediants = ingreddiantsArr;
    // });
  }

  ngOnDestroy() {
    //this.ingrediantsSubscription.unsubscribe();
  }

  onEditIngrediant(index: number, ingrediant: Ingrediant) {
    //this.shoppingSVC.emitIngrediantIndexToEdit.next(index);
    this.shoppingSVC.emitIngrediantToEdit.next({ index: index, ingrediant: ingrediant });
  }
}
