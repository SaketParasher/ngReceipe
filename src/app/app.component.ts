import { Component, OnInit } from "@angular/core";
import { AuthserviceService } from "./auth/auth/authservice.service";

import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as fromAuth from './store/actions/auth.action';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(private authSVC: AuthserviceService, private store: Store<fromApp.AppState>) { }
  ngOnInit() {
    // this.authSVC.autoLogin()
    this.store.dispatch(new fromAuth.AutoLogin())
  }

}
