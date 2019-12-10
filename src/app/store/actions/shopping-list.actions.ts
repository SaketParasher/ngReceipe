
import { Action } from "@ngrx/store";
import { Ingrediant } from "../../shared/ingrediant.model";

export const ADD_INGREDIANT = 'ADD_INGREDIANT';
export const ADD_INGREDIANTS = 'ADD_INGREDIANTS';
export const UPDATE_INGREDIANTS = 'UPDATE_INGREDIANTS';
export const DELETE_INGREDIANTS = 'DELETE_INGREDIANTS';

export class AddIngrediant implements Action {
  readonly type = ADD_INGREDIANT;
  constructor(public payload: Ingrediant) { }
}

export class AddIngrediants implements Action {
  readonly type = ADD_INGREDIANTS;
  constructor(public payload: Ingrediant[]) { }
}

export class UpdateIngrediants implements Action {
  readonly type = UPDATE_INGREDIANTS;
  constructor(public payload: { index: number, ingrediant: Ingrediant }) { }
}

export class DeleteIngrediants implements Action {
  readonly type = DELETE_INGREDIANTS;
  constructor(public payload: number) { }
}


export type ShoppingListActionTypes = AddIngrediant | AddIngrediants | UpdateIngrediants | DeleteIngrediants;
