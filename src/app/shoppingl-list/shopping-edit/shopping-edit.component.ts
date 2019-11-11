import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef
} from "@angular/core";
import { Ingrediant } from "../../shared/ingrediant.model";

import { ShoppingListService } from "../shopping-list.service";
@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", { static: false }) name: ElementRef;
  @ViewChild("amountInput", { static: false }) amount: ElementRef;

  // @Output()
  // emitIngrediant = new EventEmitter<Ingrediant>();

  constructor(private shoppingSVC: ShoppingListService) {}

  ngOnInit() {}

  addIngrediant(evt) {
    evt.preventDefault();
    console.log("On Add Ingrediant");
    // this.emitIngrediant.emit(
    //   new Ingrediant(
    //     this.name.nativeElement.value,
    //     this.amount.nativeElement.value
    //   )
    // );

    this.shoppingSVC.addIngrediants(
      new Ingrediant(
        this.name.nativeElement.value,
        this.amount.nativeElement.value
      )
    );
  }
}
