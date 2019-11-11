import { Component, OnInit, DoCheck } from "@angular/core";
import { Ingrediant } from "../shared/ingrediant.model";

import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: "app-shoppingl-list",
  templateUrl: "./shoppingl-list.component.html",
  styleUrls: ["./shoppingl-list.component.css"]
  //providers: [ShoppingListService]
})
export class ShoppinglListComponent implements OnInit {
  ingrediants: Ingrediant[];
  constructor(private shoppingSVC: ShoppingListService) {}

  ngOnInit() {
    this.ingrediants = this.shoppingSVC.getIngrediants();
    this.shoppingSVC.emitIngrediants.subscribe(ingreddiantsArr => {
      this.ingrediants = ingreddiantsArr;
    });
  }
}
