import { Receipe } from "./../receipe.model";
import { Component, OnInit } from "@angular/core";
import { ReceipeService } from "../receipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-receipe-detail",
  templateUrl: "./receipe-detail.component.html",
  styleUrls: ["./receipe-detail.component.css"]
})
export class ReceipeDetailComponent implements OnInit {
  //@Input()
  selectedReceipe: Receipe;

  constructor(
    private receipeSVC: ReceipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedReceipe = this.receipeSVC.getReceipeById(+params["id"]);
    });
  }

  addIngrediantsToShoppingList() {
    this.receipeSVC.addIngrediantsToShopping(this.selectedReceipe.ingrediants);
  }
  editReceipe() {
    this.router.navigate(["/receipe/" + this.selectedReceipe.id + "/edit"]);
  }
}
