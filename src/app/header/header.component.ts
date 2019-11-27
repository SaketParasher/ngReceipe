import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { AuthserviceService } from "../auth/auth/authservice.service";
import { Subscription } from 'rxjs';

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

  constructor(private authSVC: AuthserviceService) { }

  ngOnInit() {
    this.authenticationSubscription = this.authSVC.emitUser.subscribe((user) => {
      this.isAuthenticated = !!user;
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
