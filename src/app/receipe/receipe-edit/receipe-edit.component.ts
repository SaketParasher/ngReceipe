import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ReceipeService } from "../receipe.service";
import { Receipe } from '../receipe.model';

import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-receipe-edit",
  templateUrl: "./receipe-edit.component.html",
  styleUrls: ["./receipe-edit.component.css"]
})
export class ReceipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  receipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private receipeSVC: ReceipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      console.log(this.editMode);
      this.initForm();
    });
  }

  private initForm() {
    let receipeName = '';
    let receipeImagePath = '';
    let receipeDescription = '';
    let rId = '';
    let receipeIngrediantsArray = new FormArray([]);

    if (this.editMode) {
      // let receipe = this.receipeSVC.getReceipeById(this.id);
      let receipeToSet;
      this.store.select('receipe').pipe(
        map(receipes => {
          return receipes.receipes.find((receipe, ind) => {
            return ind == this.id - 1;
          })
        })
      ).subscribe((recipe) => {
        receipeToSet = recipe;
      });
      console.log('ReceipeToSet');
      console.log(receipeToSet);
      receipeName = receipeToSet.name;
      receipeImagePath = receipeToSet.imageURL;
      receipeDescription = receipeToSet.description;
      rId = receipeToSet.restId;
      if (receipeToSet['ingrediants']) {
        for (let ingrediant of receipeToSet.ingrediants) {
          receipeIngrediantsArray.push(new FormGroup({
            'name': new FormControl(ingrediant.name, Validators.required),
            'amount': new FormControl(ingrediant.amount, Validators.required)
          }))
        }
      }
    }

    this.receipeForm = new FormGroup({
      'name': new FormControl(receipeName, Validators.required),
      'imagePath': new FormControl(receipeImagePath, Validators.required),
      'description': new FormControl(receipeDescription, Validators.required),
      'ingrediants': receipeIngrediantsArray,
      'rid': new FormControl(rId)
    })

  }

  get ingrediantsControl() {
    return (this.receipeForm.get('ingrediants') as FormArray).controls
  }
  addIngrediant() {
    (<FormArray>this.receipeForm.get('ingrediants')).push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl()
    }))
  }
  deleteIngrediant(i) {
    (<FormArray>this.receipeForm.get("ingrediants")).removeAt(i);
  }

  onReceipeSubmit() {
    let receipeName = this.receipeForm.get("name").value;
    let imgURL = this.receipeForm.get("imagePath").value;
    let description = this.receipeForm.get("description").value;
    let ingrediants = this.receipeForm.get("ingrediants").value;
    let rid = this.receipeForm.get("rid").value;
    let receipeToSend = new Receipe(this.id, receipeName, description, imgURL, ingrediants, rid);
    if (this.editMode) {
      this.receipeSVC.updateReceipe(this.id, receipeToSend);
      this.cancel();
    } else {
      this.receipeSVC.addNewReceipe(receipeToSend);
      this.cancel();
    }
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
