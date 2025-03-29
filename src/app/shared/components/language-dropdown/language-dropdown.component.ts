import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppState, AppStateService } from '../../services/app-state/app-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss'
})
export class LanguageDropdownComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(private appStateService: AppStateService) {}

  get state$() {
    return this.appStateService.state;
  }

  toggleDropdown(): void {
    const dropdownEl = this.dropdown.nativeElement;
    if (dropdownEl.classList.contains('hidden')) {
      dropdownEl.classList.remove('hidden');
    } else {
      dropdownEl.classList.add('hidden');
    }
  }

  changeLanguage(lang: string): void {
    this.appStateService.setLanguage(lang);
    this.dropdown.nativeElement.classList.add('hidden');
  }
}
