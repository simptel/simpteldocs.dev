import { Component } from '@angular/core';
import { BurgerMenuSvgComponent } from '../../components/svg/burger-menu/burger-menu.component';
import { ThemePreferencePickerComponent } from '../../components/theme-preference-picker/theme-preference-picker.component';
import { DocumentService } from '../../services/document.service';
import { MarkdownData } from '../../../assets/docs/markdown';
import { ChevronRightSvgComponent } from '../../components/svg/chevron-right/chevron-right.component';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { trigger, transition, style, animate } from '@angular/animations';
import { BackSvgComponent } from '../../components/svg/back/back.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, BurgerMenuSvgComponent, ThemePreferencePickerComponent, ChevronRightSvgComponent, 
    OverlayModule, BackSvgComponent],
  templateUrl: './side-menu.component.html',
  animations: [
    trigger('childAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate(250, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class SideMenuComponent {
  public isSideMenuOpen = false;
  public isSubMenuOpen = false;
  public sideMenusList!: MarkdownData[];
  public docsName: string = 'Docs';
  public directoryName: string = 'Getting Started';
  public subMenusList!: MarkdownData[];

  constructor(private documentService: DocumentService) {
    this.viewSideMenus()
  }
  
  public toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  public toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  private viewSideMenus() {
    this.documentService.getSimpleDocs().subscribe(res => {
      this.sideMenusList = Object.values(res);
    });
  }

  public openSubMenu(menu: MarkdownData) {
    this.directoryName = menu.name;
    this.subMenusList = menu.data;
  }

}
