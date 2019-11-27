import { Component, OnInit } from "@angular/core";
import { AuthserviceService } from "./auth/auth/authservice.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(private authSVC: AuthserviceService) { }
  ngOnInit() {
    this.authSVC.autoLogin()
  }
}
