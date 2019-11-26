import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Receipe } from './receipe.model';
import { ReceipeDataService } from '../shared/receipe-data.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReceipeDataResolver implements Resolve<Receipe[]>{

  constructor(private dataSVC: ReceipeDataService) { }

  resolve(routeState: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<Receipe[]> {
    console.log('Inside Receipe Resolver');
    return this.dataSVC.getReceipes();
  }
}
