import { Component, ElementRef, Signal, ViewChild } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { AppState, AppStateService } from '../../services/app-state/app-state.service';

@Component({
    selector: 'app-language-dropdown',
    imports: [TranslateModule],
    templateUrl: './language-dropdown.component.html',
    styleUrl: './language-dropdown.component.scss'
})
export class LanguageDropdownComponent {
  @ViewChild('dropdown') dropdown: ElementRef<HTMLDivElement> | undefined;
  state$: Signal<AppState>;
  constructor(private appStateService: AppStateService) {
    this.state$ = this.appStateService.state;
  }

  toggleDropdown(): void {
    const dropdownEl = this.dropdown?.nativeElement;
    if (dropdownEl?.className.includes('hidden')) {
      this.showDropdown()
    } else {
      this.removeDropdown()
    }
  }

  removeDropdown(): void {
    this.dropdown?.nativeElement?.classList.remove('deploy-dropdown');
    this.dropdown?.nativeElement?.classList.add('reagroup-dropdown');
    setTimeout(() => {
      this.dropdown?.nativeElement?.classList.add('hidden');
    }, 100);
  }

  showDropdown(): void {
    this.dropdown?.nativeElement?.classList.remove('reagroup-dropdown');
    this.dropdown?.nativeElement?.classList.remove('hidden');
    this.dropdown?.nativeElement?.classList.add('deploy-dropdown');
  }

  changeLanguage(lang: string): void {
    this.removeDropdown();
    this.appStateService.setLanguage(lang); // Cambia el idioma global
  }
}
