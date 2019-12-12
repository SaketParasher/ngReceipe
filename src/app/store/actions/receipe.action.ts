
import { Action } from '@ngrx/store';

import { Receipe } from '../../receipe/receipe.model';

export enum ReceipeActionTypes {
  ADD_RECEIPE = 'ADD_RECEIPE',
  ADD_RECEIPES = 'ADD_RECEIPES'
}

export class AddReceipe implements Action {
  readonly type = ReceipeActionTypes.ADD_RECEIPE;
  constructor(public payload: Receipe) { }
}

export class AddReceipes implements Action {
  readonly type = ReceipeActionTypes.ADD_RECEIPES;
  constructor(public payload: Receipe[]) { }
}

export type ReceipeActions = AddReceipe | AddReceipes;
