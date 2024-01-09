import { TestBed } from "@angular/core/testing";
import { ThemePreferenceService } from "./theme-preference.service";

describe('ThemePreferenceService unit tests', () => {
    let service: ThemePreferenceService;

    beforeEach(() => {
        service = TestBed.inject(ThemePreferenceService);
    });

    it('should check system mode is dark', () => {
        const isDarkMode = true;
        service['setSystemMode'](isDarkMode);
        expect(document.documentElement.classList[0]).to.equal('dark');
    });

    it('should check system mode is light', () => {
        const isDarkMode = false;
        service['setSystemMode'](isDarkMode);
        expect(document.documentElement.classList[0]).not.to.equal('dark');
    });

    it('should check the light mode', () => {
        service.switchColorScheme('light');
        const preference = localStorage.getItem('colorSchemePreference');
        expect(preference).to.equal('light');
    });

    it('should check the dark mode', () => {
        service.switchColorScheme('dark');
        const preference = localStorage.getItem('colorSchemePreference');
        expect(preference).to.equal('dark');
    });

    it('should check initially mode is light', () => {
        expect(document.documentElement.classList[0]).to.not.equal(matchMedia?.('(prefers-color-scheme: dark)').matches);
    });

    it('should check intially mode system', () => {
        const colorSchemePreference: string = 'system';
        service['initializeColorSchemePreference'];
        const preference = localStorage.getItem('colorSchemePreference');
        expect(colorSchemePreference).equal(preference ?? 'system')
    })
});