import { Component, OnInit } from "@angular/core";

import { Receipe } from "../receipe.model";

@Component({
  selector: "app-receipe-list",
  templateUrl: "./receipe-list.component.html",
  styleUrls: ["./receipe-list.component.css"]
})
export class ReceipeListComponent implements OnInit {
  receipes: Receipe[] = [
    new Receipe(
      "A Test Teceipe",
      "A Unique Receipe with unique Test",
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-stuffing-recipe-1570197599.jpg?crop=1.00xw:0.669xh;0,0.296xh&resize=480:*"
    )
  ];
  constructor() {}

  ngOnInit() {}
}
