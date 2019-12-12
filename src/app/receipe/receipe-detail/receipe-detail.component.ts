import { Receipe } from "./../receipe.model";
import { Component, OnInit } from "@angular/core";
import { ReceipeService } from "../receipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { tap, map, switchMap } from 'rxjs/operators';

@Component({
  selector: "app-receipe-detail",
  templateUrl: "./receipe-detail.component.html",
  styleUrls: ["./receipe-detail.component.css"]
})
export class ReceipeDetailComponent implements OnInit {
  //@Input()
  selectedReceipe: Receipe;
  id: number;

  constructor(
    private receipeSVC: ReceipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      tap((params: Params) => this.id = +params["id"]),
      switchMap(() => {
        return this.store.select('receipe').pipe(
          map((receipes) => {
            return receipes.receipes.find((receipe, ind) => ind == this.id - 1)
          })
        )
      })
    )
      .subscribe((receipe) => {

        this.selectedReceipe = receipe;
      })
    // .subscribe((params: Params) => {
    //   this.selectedReceipe = this.receipeSVC.getReceipeById(+params["id"]);
    // });
  }

  addIngrediantsToShoppingList() {
    this.receipeSVC.addIngrediantsToShopping(this.selectedReceipe.ingrediants);
  }
  editReceipe() {
    this.router.navigate(["/receipe/" + this.selectedReceipe.id + "/edit"]);
  }
}
