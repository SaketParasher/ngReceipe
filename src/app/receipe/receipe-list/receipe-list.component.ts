import { ReceipeService } from "../receipe.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { Receipe } from "../receipe.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-receipe-list",
  templateUrl: "./receipe-list.component.html",
  styleUrls: ["./receipe-list.component.css"]
})
export class ReceipeListComponent implements OnInit {
  receipes: Receipe[] = [];

  // @Output()
  // receipeToEmit = new EventEmitter<Receipe>();

  constructor(private receipeSVC: ReceipeService, private router: Router) { }

  ngOnInit() {
    this.receipes = this.receipeSVC.getReceipe();
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
}
