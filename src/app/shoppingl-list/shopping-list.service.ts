import { Ingrediant } from "../shared/ingrediant.model";
import { EventEmitter } from "@angular/core";
export class ShoppingListService {
  emitIngrediants = new EventEmitter<Ingrediant[]>();
  private ingrediants: Ingrediant[] = [
    new Ingrediant("Apples", 5),
    new Ingrediant("Tomato", 10)
  ];

  getIngrediants() {
    return this.ingrediants.slice();
  }

  addIngrediants(ingrediant: Ingrediant) {
    this.ingrediants.push(ingrediant);
    this.emitIngrediants.emit(this.ingrediants.slice());
  }

  addIngrediantsToShoppingList(ingrediants: Ingrediant[]) {
    this.ingrediants.push(...ingrediants);
    this.emitIngrediants.emit(this.ingrediants.slice());
  }
}
