import { Subscription } from "rxjs";

import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Ingrediant } from "../../shared/ingrediant.model";
import { NgForm } from "@angular/forms";

import { ShoppingListService } from "../shopping-list.service";
@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("nameInput", { static: false }) name: ElementRef;
  // @ViewChild("amountInput", { static: false }) amount: ElementRef;

  @ViewChild('ingrediantForm', { static: true })
  ingForm: NgForm;

  editModeSubscription: Subscription;
  editMode = false;
  editedIngrediantIndex: number;
  editedIngrediant: Ingrediant;

  constructor(private shoppingSVC: ShoppingListService) { }

  ngOnInit() {
    this.editModeSubscription = this.shoppingSVC.emitIngrediantIndexToEdit.subscribe((index) => {
      this.editMode = true;
      this.editedIngrediantIndex = index;
      this.editedIngrediant = this.shoppingSVC.getIngrediantByIndex(index);
      this.ingForm.setValue({
        ingrediantName: this.editedIngrediant.name,
        ingrediantAmount: this.editedIngrediant.amount
      })
    });
  }

  addIngrediant(ingrediantForm: NgForm) {

    this.shoppingSVC.addIngrediants(
      new Ingrediant(
        ingrediantForm.value.ingrediantName,
        ingrediantForm.value.ingrediantAmount
      )
    );
    this.onClear();
  }

  updateIngrediant() {
    let updatedIngrediant = new Ingrediant(this.ingForm.value.ingrediantName, this.ingForm.value.ingrediantAmount);
    console.log(updatedIngrediant);
    this.shoppingSVC.updateIngrediant(this.editedIngrediantIndex, updatedIngrediant);
    this.onClear();
  }

  onClear() {
    this.ingForm.reset();
    this.editedIngrediant = null;
    this.editMode = false;
  }

  deleteIngrediant() {
    this.shoppingSVC.deleteIngrediant(this.editedIngrediantIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.editModeSubscription.unsubscribe();
  }
}
