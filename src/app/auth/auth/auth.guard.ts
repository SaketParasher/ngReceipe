import { AuthserviceService } from './authservice.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authSVC: AuthserviceService, private router: Router, private store: Store<fromApp.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
    : boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(take(1), map((user) => {
      console.log(user.user);
      const loadedUser = user.user;
      console.log('Loaded user from Auth ')
      if (loadedUser) {
        return true;
      }
      return this.router.createUrlTree(['/auth'])
    }))
  }
}
