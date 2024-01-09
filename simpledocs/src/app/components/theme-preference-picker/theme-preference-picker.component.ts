import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemePreferenceService } from '../../services/theme-preference.service';
import { SunSvgComponent } from '../svg/sun/sun.component';
import { MoonSvgComponent } from '../svg/moon/moon.component';
import { CdkMenu, CdkMenuItemCheckbox, CdkMenuTrigger } from '@angular/cdk/menu';
import { FlashAutoComponent } from '../svg/flash-auto/flash-auto.component';

@Component({
  selector: 'app-theme-preference-picker',
  standalone: true,
  imports: [
    CommonModule,
    FlashAutoComponent,
    SunSvgComponent,
    MoonSvgComponent,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItemCheckbox
  ], templateUrl: './theme-preference-picker.component.html',
})
export class ThemePreferencePickerComponent {
  public colorSchemePreference: string;

  constructor(
    private themePreferenceService: ThemePreferenceService,
  ) {
    this.colorSchemePreference = this.themePreferenceService.colorSchemePreference;
  }

  public switchColorScheme(mode: string): void {
    this.colorSchemePreference = mode;
    this.themePreferenceService.switchColorScheme(mode);
  }

}
