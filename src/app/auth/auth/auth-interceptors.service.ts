import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from "@angular/common/http";
import { AuthserviceService } from './authservice.service';
import { take, exhaustMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSVC: AuthserviceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authSVC.emitUser.pipe(take(1), exhaustMap((userData) => {
      if (userData) {
        let modifiedReq = req.clone({ params: new HttpParams().set('auth', userData.token) })
        return next.handle(modifiedReq);
      } else {
        let modifiedReq = req.clone();
        return next.handle(modifiedReq);
      }

    }))

  }
}
