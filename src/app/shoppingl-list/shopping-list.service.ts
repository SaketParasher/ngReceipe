import { Injectable } from '@angular/core';
import { Ingrediant } from "../shared/ingrediant.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

import { Store } from "@ngrx/store";
import * as ShoppingListActions from '../store/actions/shopping-list.actions';
import * as fromApp from '../store/app.reducer';


@Injectable()
export class ShoppingListService {
  emitIngrediants = new Subject<Ingrediant[]>();
  emitIngrediantIndexToEdit = new Subject<number>();
  emitIngrediantToEdit = new Subject<{ index: number, ingrediant: Ingrediant }>();

  constructor(private store: Store<fromApp.AppState>) {

  }

  private ingrediants: Ingrediant[] = [
    new Ingrediant("Apples", 5),
    new Ingrediant("Tomato", 10)
  ];

  getIngrediants() {
    return this.ingrediants.slice();
  }

  getIngrediantByIndex(index) {
    return this.ingrediants[index];
  }

  addIngrediants(ingrediant: Ingrediant) {
    this.ingrediants.push(ingrediant);
    this.emitIngrediants.next(this.ingrediants.slice());
  }

  addIngrediantsToShoppingList(ingrediants: Ingrediant[]) {
    this.ingrediants.push(...ingrediants);
    this.emitIngrediants.next(this.ingrediants.slice());
  }

  updateIngrediant(index, updatedIngrediant) {
    // this.ingrediants.splice(index, 1, updatedIngrediant);
    // this.emitIngrediants.next(this.ingrediants.slice());
    this.store.dispatch(new ShoppingListActions.UpdateIngrediants({ index: index, ingrediant: updatedIngrediant }))
  }

  deleteIngrediant(index) {
    // this.ingrediants.splice(index, 1);
    // this.emitIngrediants.next(this.ingrediants.slice());
    this.store.dispatch(new ShoppingListActions.DeleteIngrediants(index));
  }


}
