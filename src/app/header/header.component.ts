import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output()
  EmitSection = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  NavigationClicked(section) {
    this.EmitSection.emit(section);
  }
}
