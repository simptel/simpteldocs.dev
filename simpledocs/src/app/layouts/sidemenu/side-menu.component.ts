import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PageComponent } from '../../page/page.component';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  routes!: Route[];
  theme = 'light';
  repoName!: string;
  directories!: object;
  files!: object;
  showItems = -1;
  showInput = false;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private router: Router, 
    private githubService: GithubService, 
    private http: HttpClient
  ) {
    this.routes = [];
    this.getRoutes();
    this.getRepoUrl();
    localStorage.setItem('color-theme', this.theme);
  }

  ngOnInit(): void {
    this.githubService.refreshDocs$.subscribe((res: boolean) => {
      if (res) {
        this.getRoutes();
        this.getRepoUrl();
      }
    })
  }

  toggleTheme(): void {
    if(localStorage.getItem('color-theme') == 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      this.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      this.theme = 'light';
    }
  }

  getRepoUrl() {
    this.githubService.getRepoUrl().subscribe((url: string) => {
      this.repoName = url;
    });
  }

  async toggleSubMenu(i: number, path:string) {
    if (this.showItems === i) {
      this.showItems = -1;
    } else {
      this.showItems = i;
    }
    this.getDirectoriesContent(path);
    path = path.replace(' ', '-').toLowerCase();
    this.router.navigateByUrl(path);
  }

  getDirectoriesContent(path: string) {
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${path}`)
    .subscribe(res => {   
      this.files = res;   
    });
  }

  onChange(page: string) {
    this.router.navigateByUrl(page);
  }

  getRoutes() {
    this.getRepoUrl();
    this.githubService.showDocsApi(this.repoName)
    .subscribe((res: object) => {
      this.addRoutes(res);
    });  
  }

  addRoutes(res: object) {
    if (res instanceof Array) {
      res.forEach(item => {
        let path = '';
        if(item.name?.includes(' ')) {
          path = item.name.replace(' ', '-').toLocaleLowerCase(); 
        } else {
          path = item.name?.toLocaleLowerCase();
        }
        !this.routes?.find(route => route.path == path) && 
        this.routes.push({
          path: path,
          data: { label: item.name },
          component: PageComponent
        });
        this.router.resetConfig(this.routes);
      });
    }
  }
}
