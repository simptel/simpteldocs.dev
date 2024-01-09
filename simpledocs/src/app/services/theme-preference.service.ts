import { Injectable, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class ThemePreferenceService {
  private renderer: Renderer2;
  public colorSchemePreference = 'system';

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initializeColorSchemePreference();
    this.setColorScheme();
  }

  private initializeColorSchemePreference(): void {
    if (isPlatformBrowser(this.platformId)) {
      const preference = localStorage.getItem('colorSchemePreference');
      this.colorSchemePreference = preference ?? 'system';
    }
  }

  public switchColorScheme(mode: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('colorSchemePreference', mode);
      this.initializeColorSchemePreference();
      this.setColorScheme();
    }
  }

  private determineDarkMode() {
    if (this.colorSchemePreference === 'system') {
      if (isPlatformBrowser(this.platformId)) {
        return matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
      } else return false;
    } else {
      return this.colorSchemePreference === 'dark';
    }
  }

  private setSystemMode(darkMode: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      if (darkMode) {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
    }

  }

  public setColorScheme(): void {
    const isDarkMode = this.determineDarkMode();
    this.setSystemMode(isDarkMode);
  }
}
