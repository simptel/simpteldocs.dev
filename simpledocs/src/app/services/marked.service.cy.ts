import { TestBed } from "@angular/core/testing";
import { MarkedService } from "./marked.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

describe('MarkedService unit tests', () => {
    let service: MarkedService;
    let sanitizer: DomSanitizer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(MarkedService);
        sanitizer = TestBed.inject(DomSanitizer);
    });

    it('should fetch and render markdown', () => {
        const mockDocumentUrl = '/assets/legal/terms-and-conditions.md';
        const data = service.fetchAndRenderMarkdown(mockDocumentUrl);
        expect(data).to.be.an('object');
        cy.intercept('GET', mockDocumentUrl, (req) => {
            expect(req.body).to.deep.equal({responseType: 'text'})
        }).as('render_markdown');
    });

    it('should check markdown file extension', () => {
        const mockDocumentUrl = '/assets/legal/terms-and-conditions.md';
        const document = service.isMarkdownFileExtension(mockDocumentUrl);
        expect(document).to.be.true;
    });

    it('should read markdown file', () => {
        const mockDocumentUrl = '/assets/legal/terms-and-conditions.md';
        const document = service.isMarkdown(mockDocumentUrl);
        expect(document).to.be.true;
    });

    it('should convert markdown to html', () => {
        const markdown = '## hello';
        const html = service.markdownToHTML(markdown);
        expect(html).to.equal('<h2>hello</h2>\n');
    });

    it('should sanitize generated html', () => {
        const html = '<h2>hello</h2>\n';
        const sanitizedHtml = service.sanitizeGeneratedHTML(html);
        expect(sanitizedHtml).to.eq('<h2>hello</h2>&#10;');
    });

    it('should throw an error if HTML is not safe', () => {     
        const unsafeHtml = '<script>alert("Hello!");</script>'; 
        expect(() => 
        service.sanitizeGeneratedHTML(unsafeHtml)).to.throw('HTML Is not safe');   
    });

    it('should return sanitized HTML if HTML is safe', () => { 
        const safeHtmlString = '<p>This is safe HTML</p>';     
        const sanitizedHtml: SafeHtml = sanitizer.bypassSecurityTrustHtml(safeHtmlString);   
        cy.spy(sanitizer, 'sanitize').returned(sanitizedHtml);    
        expect(service.sanitizeGeneratedHTML(safeHtmlString)).to.equal(safeHtmlString as string);   
    });

    it('should handle errors in fetching and rendering markdown', () => {
        cy.window().then((win) => {
            cy.spy(win.console, 'error').as('consoleError');
        });
    });
});