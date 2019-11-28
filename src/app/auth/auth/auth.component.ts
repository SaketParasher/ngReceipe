import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from "rxjs";


import { AuthserviceService, AuthResponseData } from "./authservice.service";
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // getting the reference of first Placeholder directive used in the dom using view child
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  closeSubscription: Subscription;

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  responseObservable: Observable<AuthResponseData>;

  constructor(private authSVC: AuthserviceService, private router: Router, private componentFactoryresolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  switchModes() {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthSubmit(authForm: NgForm) {
    this.isLoading = true;
    let email = authForm.value.email;
    let password = authForm.value.password;

    if (this.isLoginMode) {
      this.responseObservable = this.authSVC.Login(email, password);
    } else {
      if (authForm.valid) {
        this.responseObservable = this.authSVC.signUp(email, password)
      }
    }

    // Storing both login and signup in same observable and then subscribing at one place
    this.responseObservable.subscribe((authData) => {
      this.isLoading = false;
      this.router.navigate(['/receipe']);
      console.log(authData)
    },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.showErrorAlert(errorMessage);
        //setTimeout(() => { this.errorMessage = null }, 5500);
        this.isLoading = false;
        console.log(errorMessage);
      })
    authForm.reset();
  }

  //close the modal on output Emission
  onHandleError() {
    this.errorMessage = null;
  }

  // Dynamic Component Programatically
  private showErrorAlert(error: string) {
    const alertComponentFactory = this.componentFactoryresolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = error;
    this.closeSubscription = componentRef.instance.emitClose.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    })

  }

}
