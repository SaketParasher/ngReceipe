import { Component, OnInit } from "@angular/core";
import { Ingrediant } from "../shared/ingrediant.model";

@Component({
  selector: "app-shoppingl-list",
  templateUrl: "./shoppingl-list.component.html",
  styleUrls: ["./shoppingl-list.component.css"]
})
export class ShoppinglListComponent implements OnInit {
  ingrediants: Ingrediant[] = [
    new Ingrediant("Apples", 5),
    new Ingrediant("Tomato", 10)
  ];
  constructor() {}

  ngOnInit() {}
}
