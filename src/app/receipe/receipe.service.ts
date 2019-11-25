import { Injectable, EventEmitter } from "@angular/core";
import { Receipe } from "./receipe.model";
import { Ingrediant } from "../shared/ingrediant.model";
import { ShoppingListService } from "../shoppingl-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class ReceipeService {
  private receipe: Receipe[] = [
    new Receipe(
      1,
      "Pizza Receipe",
      "Pizza Receipe with unique Test",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmI03moF0Vz0U8IIJUCurCd5jpqguy6Dtwtyw8VhYtXAYCw1yjuQ&s",
      [
        new Ingrediant("Onion", 5),
        new Ingrediant("Capsicum", 2),
        new Ingrediant("Jalapino", 4)
      ]
    ),
    new Receipe(
      2,
      "Burger Recipe",
      "Burger Receipe with unique Test",
      "https://assets.bonappetit.com/photos/5d1cb1880813410008e914fc/16:9/w_1200,c_limit/Print-Summer-Smash-Burger.jpg",
      [
        new Ingrediant("Bunns", 5),
        new Ingrediant("Capsicum", 2),
        new Ingrediant("Paneer", 4)
      ]
    )
  ];

  // emit all receipes after adding or updating receipes array.
  emitReceipes: Subject<Receipe[]> = new Subject<Receipe[]>();

  constructor(private slSVC: ShoppingListService) { }

  //public selectedReceipe = new EventEmitter<Receipe>();

  getReceipe() {
    return this.receipe.slice();
  }

  addIngrediantsToShopping(ingrediant: Ingrediant[]) {
    this.slSVC.addIngrediantsToShoppingList(ingrediant);
  }
  getReceipeById(id: number) {
    return this.receipe.find(receipe => receipe.id == id);
  }

  // add a new receipe from edit receipe component
  addNewReceipe(receipe: Receipe) {
    receipe.id = this.receipe.length + 1;
    this.receipe.push(receipe);
    this.emitReceipes.next(this.receipe);
  }

  // update a receipe from edit receipe component
  updateReceipe(id: number, updatedReceipe: Receipe) {
    let indexToUpdate = this.receipe.indexOf(this.getReceipeById(id));
    this.receipe[indexToUpdate] = updatedReceipe;
    this.emitReceipes.next(this.receipe);
  }

}
