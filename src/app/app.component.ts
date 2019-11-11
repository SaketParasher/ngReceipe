import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "ngRecipe";
  sectionToShow: string = "receipe";

  onSectionEmit(section) {
    this.sectionToShow = section;
  }
}
