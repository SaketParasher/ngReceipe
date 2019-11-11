import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-receipe-edit",
  templateUrl: "./receipe-edit.component.html",
  styleUrls: ["./receipe-edit.component.css"]
})
export class ReceipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      console.log(this.editMode);
    });
  }
}
