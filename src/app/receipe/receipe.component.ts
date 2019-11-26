import { Receipe } from "./receipe.model";
import { Component, OnInit } from "@angular/core";
import { ReceipeService } from "./receipe.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-receipe",
  templateUrl: "./receipe.component.html",
  styleUrls: ["./receipe.component.css"]
})
export class ReceipeComponent implements OnInit {
  selectedReceipe: Receipe;
  constructor(private receipeSVC: ReceipeService, private route: ActivatedRoute) { }

  ngOnInit() {

    // we will get all receipes using route resolver when /receipe route gets activated and then we will pass
    // this data to receipe service to set the all receipes
    this.route.data.subscribe(
      (receipData: { allRecipes: Receipe[] }) => {
        this.receipeSVC.setRecipes(receipData.allRecipes)
      })

    // this.receipeSVC.selectedReceipe.subscribe((receipe: Receipe) => {
    //   this.selectedReceipe = receipe;
    // });
  }

  // receipeEmitted(receipe: Receipe) {
  //   this.selectedReceipe = receipe;
  // }
}
