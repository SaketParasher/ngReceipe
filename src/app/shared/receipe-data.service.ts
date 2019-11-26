import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Receipe } from '../receipe/receipe.model';
import { map, tap } from 'rxjs/operators';

const Receipe_URL = "https://ng-receipe-87d8a.firebaseio.com/receipes.json";

@Injectable({ providedIn: 'root' })
export class ReceipeDataService {

  constructor(private http: HttpClient) { }

  getReceipes() {
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
    return this.http.post<Receipe>(Receipe_URL, receipe)
  }

  putReceipe(updatedReceipe: Receipe) {
    return this.http.put<Receipe>(Receipe_URL + '/' + updatedReceipe.restId, updatedReceipe)
  }
}
