import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { AuthserviceService } from "../auth/auth/authservice.service";
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  EmitSection = new EventEmitter<string>();
  authenticationSubscription: Subscription;
  isAuthenticated = false;

  constructor(private authSVC: AuthserviceService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authenticationSubscription = this.store.select('auth').subscribe((user) => {
      this.isAuthenticated = !!user.user;
    })
  }

  NavigationClicked(section) {
    this.EmitSection.emit(section);
  }

  onLogout() {
    this.authSVC.Logout();
  }

  ngOnDestroy() {
    this.authenticationSubscription.unsubscribe();
  }
}
