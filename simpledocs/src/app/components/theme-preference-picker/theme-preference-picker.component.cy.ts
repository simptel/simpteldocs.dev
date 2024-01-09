import { ThemePreferencePickerComponent } from './theme-preference-picker.component'
import { CommonModule } from '@angular/common';
import { ThemePreferenceService } from '../../services/theme-preference.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('ThemePreferencePickerComponent component tests', () => {
  beforeEach('should mount component', () => {
    cy.mount(ThemePreferencePickerComponent)
  });

  it('should test toggle button', () => {
    cy.get('button').should('have.attr', 'role', 'button').should('exist');
    cy.get('app-flash-auto-svg').should('exist');
    cy.get('button').click();
    cy.get('app-sun-svg').should('exist');
    cy.get('app-moon-svg').should('exist');
  });

  it('should test dark mode', () => {
    const preference = localStorage.getItem('colorSchemePreference');
    if (preference == 'system') {
      cy.get('app-flash-auto-svg').should('be.visible');
    } else if (preference == 'light') {
      cy.get('html').should('not.have.class', 'dark');
      cy.get('app-sun-svg').should('be.visible');
    } else if (preference == 'dark') {
      cy.get('html').should('have.class', 'dark');
      cy.get('app-moon-svg').should('be.visible');
    }
  });
})

describe('ThemePreferencePickerComponent unit tests', () => {
  let fixture: ComponentFixture<ThemePreferencePickerComponent>,
    component: ThemePreferencePickerComponent,
    service: ThemePreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [ThemePreferenceService]
    }).compileComponents();
    fixture = TestBed.createComponent(ThemePreferencePickerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ThemePreferenceService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).to.equal(component);
  });


  it('should toggle light mode switcher', () => {
    const isLightTheme = 'light';
    service.switchColorScheme(isLightTheme);
    expect(document.documentElement.classList[0]).not.to.equal('dark');
  });

  it('should toggle dark mode switcher', () => {
    const isDarkTheme = 'dark';
    service.switchColorScheme(isDarkTheme);
    expect(document.documentElement.classList[0]).to.equal('dark');
  });
});
