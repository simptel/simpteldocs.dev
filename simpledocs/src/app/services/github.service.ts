import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private repoUrl: Subject<string> = new BehaviorSubject<string>('simptel/docs.simptel.com');
  public notify = new BehaviorSubject<boolean>(false);

  refreshDocs$ = this.notify.asObservable();
  
  public setRefreshDocs(data: boolean) {
    this.notify.next(data);
  }

  constructor(private http: HttpClient) { }

  public getRepoUrl() {
    return this.repoUrl.asObservable();
  }

  public setRepoUrl(data:string) {
    this.repoUrl.next(data);
  }

  public showSimpleDocs(repoName: string) {
    return this.http.get(`https://api.github.com/repos/${repoName}/contents/docs`);
  }
}
