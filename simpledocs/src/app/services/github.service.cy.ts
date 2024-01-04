describe('should test github service', () => {
  it('should test github api', () => {
    cy.request('GET', 'https://api.github.com/repos/simptel/docs.simptel.com/contents/docs').as('docs');
    cy.get('@docs').should((response) => { });

    cy.request('GET', 'https://api.github.com/repos/simptel/docs.simptel.com/contents/docs/Getting Started').as('getting-started');
    cy.get('@getting-started').should((response) => { });
  });
});