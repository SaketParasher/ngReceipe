import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

import { Receipe } from "./receipe.model";
import { Ingrediant } from "../shared/ingrediant.model";
import { ShoppingListService } from "../shoppingl-list/shopping-list.service";
import { ReceipeDataService } from "../shared/receipe-data.service";

// NGRX IMPORTS
import { Store } from "@ngrx/store";
import { AddIngrediants } from "../store/actions/shopping-list.actions";
import * as fromApp from '../store/app.reducer';

@Injectable()
export class ReceipeService {
  private receipe: Receipe[];

  // emit all receipes after adding or updating receipes array.
  emitReceipes: Subject<Receipe[]> = new Subject<Receipe[]>();

  constructor(private slSVC: ShoppingListService, private receipeSVC: ReceipeDataService,
    private store: Store<fromApp.AppState>
  ) { }

  //public selectedReceipe = new EventEmitter<Receipe>();

  getReceipe() {
    return this.receipe.slice();
  }

  setRecipes(receipe: Receipe[]) {
    this.receipe = receipe;
  }

  addIngrediantsToShopping(ingrediant: Ingrediant[]) {
    //this.slSVC.addIngrediantsToShoppingList(ingrediant);
    this.store.dispatch(new AddIngrediants(ingrediant));
  }
  getReceipeById(id: number) {
    return this.receipe.find(receipe => receipe.id == id);
  }

  // add a new receipe from edit receipe component
  addNewReceipe(receipe: Receipe) {
    receipe.id = this.receipe.length + 1;
    this.receipeSVC.postReceipe(receipe).subscribe((data) => {
      console.log('New Receipe Posted Remote');
      console.log(data);
      this.receipe.push(receipe);
      console.log(this.receipe);
      this.emitReceipes.next(this.receipe);
    })

  }

  // update a receipe from edit receipe component
  updateReceipe(id: number, updatedReceipe: Receipe) {
    let indexToUpdate = this.receipe.indexOf(this.getReceipeById(id));
    this.receipeSVC.putReceipe(updatedReceipe).subscribe(data => {
      console.log('Updated');
      console.log(data);
    })
    this.receipe[indexToUpdate] = updatedReceipe;
    this.emitReceipes.next(this.receipe);
  }

}
