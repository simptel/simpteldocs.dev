import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { marked } from "marked";
import { Observable, map, catchError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MarkedService {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  public fetchAndRenderMarkdown(url: string): Observable<SafeHtml> {
    if (!this.isMarkdownFileExtension(url)) throw new Error('The file is not a Markdown file');

    return this.getMarkdownFile(url).pipe(
      map((markdown: string) => this.markdownToHTML(markdown)),
      map((html: string) => this.sanitizeGeneratedHTML(html)),
      catchError(error => {
        console.error("Error rendering markdown:", error);
        throw error;
      })
    );
  }

  public getMarkdownFile(url: string): Observable<string> {

    return this.http.get(url, { responseType: 'text' }).pipe(
      map((file: string) => {
        if (!this.isMarkdown(file)) {
          throw new Error('The file is not a Markdown file');
        }
        return file;
      })
    );
  }

  public sanitizeGeneratedHTML(html: string): SafeHtml {
    const sanitizedHtml = this.sanitizer.sanitize(1, html);
    if (!sanitizedHtml) throw Error('HTML Is not safe')
    return sanitizedHtml;
  }

  public isMarkdown(content: string): boolean {
    const markdownPattern = /^[\s\S]*[#*-\d]+[\s\S]*$/;
    return markdownPattern.test(content);
  }

  public isMarkdownFileExtension(url: string): boolean {
    return url.toLowerCase().endsWith('.md');
  }

  public markdownToHTML(markdown: string): string {
    try {
      const html = marked(markdown);
      return html
    } catch (error) {
      throw Error('HTML is not parsed from File')
    }
  }
}