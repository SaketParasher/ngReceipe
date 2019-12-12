import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from "rxjs";


import { AuthserviceService, AuthResponseData } from "./authservice.service";
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";

// NGRX STORE AND EFFECTS IMPORTS
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/actions/auth.action';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  // getting the reference of first Placeholder directive used in the dom using view child
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  closeSubscription: Subscription;
  authSubsciption: Subscription;

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  responseObservable: Observable<AuthResponseData>;

  constructor(
    private authSVC: AuthserviceService,
    private router: Router,
    private componentFactoryresolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.authSubsciption = this.store.select('auth').subscribe((authData) => {
      this.isLoading = authData.loading;
      this.errorMessage = authData.authError;
      if (this.errorMessage) {
        this.showErrorAlert(this.errorMessage);
      }
    })
  }

  switchModes() {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthSubmit(authForm: NgForm) {
    //this.isLoading = true;
    let email = authForm.value.email;
    let password = authForm.value.password;

    if (this.isLoginMode) {
      //this.responseObservable = this.authSVC.Login(email, password);
      // now we won't logi using service now we will login using AuthEffect for which we need to dispatch
      // LoginStart Action and then effect will dispatch login action for setting the user
      this.store.dispatch(new AuthActions.LoginStarts({ email: email, password: password }))
    } else {
      if (authForm.valid) {
        //this.responseObservable = this.authSVC.signUp(email, password)
        this.store.dispatch(new AuthActions.SignupStarts({ email: email, password: password }))
      }
    }

    // Storing both login and signup in same observable and then subscribing at one place
    // this.responseObservable.subscribe((authData) => {
    //   this.isLoading = false;
    //   this.router.navigate(['/receipe']);
    //   console.log(authData)
    // },
    //   (errorMessage) => {
    //     this.errorMessage = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     //setTimeout(() => { this.errorMessage = null }, 5500);
    //     this.isLoading = false;
    //     console.log(errorMessage);
    //   })
    authForm.reset();
  }

  //close the modal on output Emission
  onHandleError() {
    //this.errorMessage = null;
    this.store.dispatch(new AuthActions.ClearErrors())
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
  ngOnDestroy() {
    this.authSubsciption.unsubscribe();
  }

}
