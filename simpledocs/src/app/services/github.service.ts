import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private repoUrl: Subject<string> = new BehaviorSubject<string>('simptel/docs.simptel.com');
  private notify = new BehaviorSubject<boolean>(false);
  private docsData = new BehaviorSubject<object>({});

  public refreshDocs$ = this.notify.asObservable();
  public getDocsData$ = this.docsData.asObservable();
  
  public setRefreshDocs(data: boolean) {
    this.notify.next(data);
  }

  public setDocsData(data: object) {
    this.docsData.next(data);
  }

  constructor(private http: HttpClient) { }

  public getRepoUrl() {
    return this.repoUrl.asObservable();
  }

  public setRepoUrl(data:string) {
    this.repoUrl.next(data);
  }

  public showSimpleDocs(repoName: string, directoryName?: string, subDirectoryName?: string) {
    let endpoint = `https://api.github.com/repos/${repoName}/contents/docs`;
    if (directoryName) 
      endpoint = endpoint + `/${directoryName}`;
    if (subDirectoryName) 
      endpoint = endpoint + `/${directoryName}/${subDirectoryName}`;
    return this.http.get(endpoint);
  }
}
