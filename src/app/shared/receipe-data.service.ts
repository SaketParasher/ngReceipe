import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Receipe } from '../receipe/receipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { AuthserviceService } from '../auth/auth/authservice.service';

const Receipe_URL = "https://ng-receipe-87d8a.firebaseio.com/receipes.json";

@Injectable({ providedIn: 'root' })
export class ReceipeDataService {

  constructor(private http: HttpClient, private authSVC: AuthserviceService) { }

  getReceipes() {

    // return this.authSVC.emitUser.pipe(take(1), exhaustMap((userData) => {
    //   return this.http.get<Receipe[]>(Receipe_URL, { params: new HttpParams().set('auth', userData.token) })
    // }),
    //   map(
    //     (receipes) => {
    //       let rArr = [];
    //       for (let prop in receipes) {
    //         receipes[prop].restId = prop;
    //         rArr.push(receipes[prop])
    //       };
    //       return rArr
    //     }),
    //   tap(receipes => console.log(receipes))
    // )

    return this.http.get<Receipe[]>(Receipe_URL)
      .pipe(
        map(
          (receipes) => {
            let rArr = [];
            for (let prop in receipes) {
              receipes[prop].restId = prop;
              rArr.push(receipes[prop])
            };
            return rArr
          }),
        tap(receipes => console.log(receipes))
      )
  }

  postReceipe(receipe: Receipe) {

    // Now we are adding auth token in interceptor
    // return this.authSVC.emitUser.pipe(take(1), exhaustMap((userData) => {
    //   return this.http.post<Receipe>(Receipe_URL, receipe, { params: new HttpParams().set('auth', userData.token) })

    // }))

    return this.http.post<Receipe>(Receipe_URL, receipe)

  }

  putReceipe(updatedReceipe: Receipe) {
    return this.http.put<Receipe>(Receipe_URL + '/' + updatedReceipe.restId, updatedReceipe)
  }
}
