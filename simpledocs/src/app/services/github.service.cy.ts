import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { GithubService } from "./github.service";

describe('should test github service', () => {
  it('should test github api', () => {
    cy.request('GET', 'https://api.github.com/repos/simptel/docs.simptel.com/contents/docs').as('docs');
    cy.get('@docs').should((response) => { });

    cy.request('GET', 'https://api.github.com/repos/simptel/docs.simptel.com/contents/docs/Getting Started').as('getting-started');
    cy.get('@getting-started').should((response) => { });
  });
});

describe('GithubService unit tests', () => {
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GithubService);
  });

  it('should test simpledocs api with repoName', () => {
    let endpoint = `https://api.github.com/repos/simptel/docs.simptel.com/contents/docs`;
    let data = service.showSimpleDocs(endpoint);
    expect(data).to.be.an('Object');
  });

  it('should test simpledocs api with directoryName', () => {
    let endpoint = `https://api.github.com/repos/simptel/docs.simptel.com/contents/docs/Introduction`;
    let data = service.showSimpleDocs(endpoint);
    expect(data).to.be.an('Object');
  });

  it('should test simpledocs api with subDirectoryName', () => {
    let endpoint = `https://api.github.com/repos/simptel/docs.simptel.com/contents/docs/Introduction/Glossary`;
    let data = service.showSimpleDocs(endpoint);
    expect(data).to.be.an('Object');
  });

});