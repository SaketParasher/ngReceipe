import { ReceipeService } from "../receipe.service";
import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";

import { Receipe } from "../receipe.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: "app-receipe-list",
  templateUrl: "./receipe-list.component.html",
  styleUrls: ["./receipe-list.component.css"]
})
export class ReceipeListComponent implements OnInit, OnDestroy {
  receipes: Receipe[] = [];
  receipesSubscription: Subscription;

  // @Output()
  // receipeToEmit = new EventEmitter<Receipe>();

  constructor(
    private receipeSVC: ReceipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    // getting all receipes on init of receipe list component
    //this.receipes = this.receipeSVC.getReceipe();

    this.store.select('receipe').pipe(
      map((receipes) => receipes.receipes)
    ).subscribe((allReceipes) => {
      this.receipes = allReceipes;
    })

    // Now we are using RouteResolver to fetch all the receipes from database in OnInit
    //this.route.data.subscribe((receipeData: { allRecipes: Receipe[] }) => { console.log(receipeData.allRecipes); this.receipes = receipeData.allRecipes })

    this.receipesSubscription = this.receipeSVC.emitReceipes.subscribe((receipes: Receipe[]) => {
      this.receipes = receipes;
    });
    //this.receipeSVC.selectedReceipe.emit(this.receipes[0]);
    //this.receipeToEmit.emit(this.receipes[0]);
  }

  // Now we are using receipe service to emit the selected receipe to the Receipe component and store it to selectedReceipe of Receipe COmponent and then pass
  // selectedReceipe to Receipe Details comppnent using property Binding.
  onReceipeSelected(receipe: Receipe) {
    //this.receipeToEmit.emit(receipe);
    //this.receipeSVC.selectedReceipe.emit(receipe);
    //this.router.navigate(["/receipe", receipe.id]);
  }

  ngOnDestroy() {
    this.receipesSubscription.unsubscribe();
  }
}
