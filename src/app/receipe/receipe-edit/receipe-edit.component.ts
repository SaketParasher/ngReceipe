import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { NgForm, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ReceipeService } from "../receipe.service";

@Component({
  selector: "app-receipe-edit",
  templateUrl: "./receipe-edit.component.html",
  styleUrls: ["./receipe-edit.component.css"]
})
export class ReceipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  receipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private receipeSVC: ReceipeService) { }

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
    let receipeIngrediantsArray = new FormArray([]);

    if (this.editMode) {
      const receipe = this.receipeSVC.getReceipeById(this.id);
      receipeName = receipe.name;
      receipeImagePath = receipe.imageURL;
      receipeDescription = receipe.description;
      if (receipe['ingrediants']) {
        for (let ingrediant of receipe.ingrediants) {
          receipeIngrediantsArray.push(new FormGroup({
            'name': new FormControl(ingrediant.name),
            'amount': new FormControl(ingrediant.amount)
          }))
        }
      }
    }

    this.receipeForm = new FormGroup({
      'name': new FormControl(receipeName),
      'imagePath': new FormControl(receipeImagePath),
      'description': new FormControl(receipeDescription),
      'ingrediants': receipeIngrediantsArray
    })

  }

  addIngrediant() {
    (<FormArray>this.receipeForm.get('ingrediants')).push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl()
    }))
  }

}
