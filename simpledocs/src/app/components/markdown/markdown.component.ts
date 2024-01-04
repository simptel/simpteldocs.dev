import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MarkedService } from '../../services/marked.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-markdown',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './markdown.component.html',
})
export class MarkdownComponent {
  @Input() documentPath!: string;
  public renderedMarkdown$!: Observable<SafeHtml>;

  constructor(private markedService: MarkedService) {
    this.documentPath = this.documentPath ?? 'README.md';
  }

  ngOnInit(): void {
    this.renderedMarkdown$ = this.markedService.fetchAndRenderMarkdown(this.documentPath);
    this.renderedMarkdown$.subscribe();
  }
}
