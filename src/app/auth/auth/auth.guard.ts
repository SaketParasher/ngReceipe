import { AuthserviceService } from './authservice.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authSVC: AuthserviceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
    : boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.authSVC.emitUser.pipe(take(1), map((user) => {
      console.log(user);
      const loadedUser = user;
      if (loadedUser) {
        return true;
      }
      return this.router.createUrlTree(['/auth'])
    }))
  }
}
