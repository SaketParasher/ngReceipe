import { Receipe } from "./receipe.model";
import { Component, OnInit } from "@angular/core";
import { ReceipeService } from "./receipe.service";

@Component({
  selector: "app-receipe",
  templateUrl: "./receipe.component.html",
  styleUrls: ["./receipe.component.css"]
})
export class ReceipeComponent implements OnInit {
  selectedReceipe: Receipe;
  constructor(private receipeSVC: ReceipeService) {}

  ngOnInit() {
    this.receipeSVC.selectedReceipe.subscribe((receipe: Receipe) => {
      this.selectedReceipe = receipe;
    });
  }

  // receipeEmitted(receipe: Receipe) {
  //   this.selectedReceipe = receipe;
  // }
}
