import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppStateService } from '../../services/app-state/app-state.service';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [CommonModule, TranslateModule, ClickOutsideDirective],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss'
})
export class LanguageDropdownComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(private appStateService: AppStateService) { }

  get state$() {
    return this.appStateService.state;
  }

  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(open => !open);
  }

  changeLanguage(lang: 'en' | 'es') {
    this.isDropdownOpen.set(false); // cierra después de elegir
    setTimeout(() => { this.appStateService.setLanguage(lang) }, 200)

  }
}
