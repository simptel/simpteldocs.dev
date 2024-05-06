import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  constructor(
    private http: HttpClient,
  ) { }

  public getSimpleDocs(): Observable<object> {
    let endpoint = 'assets/docs/markdown.json';
    return this.http.get(endpoint);
  }

}