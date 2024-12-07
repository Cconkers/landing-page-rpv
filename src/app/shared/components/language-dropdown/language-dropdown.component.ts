import { Component, Signal } from '@angular/core';
import { AppState, AppStateService } from '../../services/app-state.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss'
})
export class LanguageDropdownComponent {
  state$: Signal<AppState>;
  open: boolean = false;
  constructor(private appStateService: AppStateService) {
    this.state$ = this.appStateService.state;
  }

  toggleDropdown(): void {
    this.open = !this.open;
  }

  changeLanguage(lang: string): void {
    this.appStateService.setLanguage(lang); // Cambia el idioma global
    this.open = false; // Cierra el dropdown
  }
}
