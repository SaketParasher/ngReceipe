import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from "rxjs";


import { AuthserviceService, AuthResponseData } from "./authservice.service";



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  responseObservable: Observable<AuthResponseData>;

  constructor(private authSVC: AuthserviceService, private router: Router) { }

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
        setTimeout(() => { this.errorMessage = null }, 3500);
        this.isLoading = false;
        console.log(errorMessage);
      })
    authForm.reset();
  }

}
