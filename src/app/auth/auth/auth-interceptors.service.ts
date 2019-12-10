import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from "@angular/common/http";
import { AuthserviceService } from './authservice.service';
import { take, exhaustMap, map } from "rxjs/operators";

import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSVC: AuthserviceService, private store: Store<fromApp.AppState>) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(take(1), map(res => res.user), exhaustMap((userData) => {
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
