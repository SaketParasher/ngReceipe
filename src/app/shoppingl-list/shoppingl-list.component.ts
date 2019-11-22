import { Component, OnInit, DoCheck, OnDestroy } from "@angular/core";
import { Ingrediant } from "../shared/ingrediant.model";

import { ShoppingListService } from "./shopping-list.service";

import { Subscription } from "rxjs";

@Component({
  selector: "app-shoppingl-list",
  templateUrl: "./shoppingl-list.component.html",
  styleUrls: ["./shoppingl-list.component.css"]
  //providers: [ShoppingListService]
})
export class ShoppinglListComponent implements OnInit, OnDestroy {
  ingrediants: Ingrediant[];
  ingrediantsSubscription: Subscription;

  constructor(private shoppingSVC: ShoppingListService) { }

  ngOnInit() {
    // this is to get ingrediants when this component is initialized
    this.ingrediants = this.shoppingSVC.getIngrediants();

    // this is to get get the ingrediants when an ingrediant or array of ingrediants are added
    this.ingrediantsSubscription = this.shoppingSVC.emitIngrediants.subscribe(ingreddiantsArr => {
      this.ingrediants = ingreddiantsArr;
    });
  }

  ngOnDestroy() {
    this.ingrediantsSubscription.unsubscribe();
  }

  onEditIngrediant(index: number) {
    this.shoppingSVC.emitIngrediantIndexToEdit.next(index);
  }
}
