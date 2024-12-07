import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface AppState {
  language: string;
  theme: string;
}

@Injectable({
  providedIn: 'root'
})

export class AppStateService {
  private _state = signal<AppState>({
    language: 'en',
    theme: 'light',
  });
  constructor(private translate: TranslateService) {
    this.loadInitialState();
  }

  /**
   *  Load initial state from local storage or browser language and theme
   */
  private loadInitialState(): void {
    // Get saved language from local storage
    const savedLanguage = localStorage.getItem('language');
    // Get language from browser
    const browserLang = navigator.language.split('-')[0];
    // Set initial language based on saved language or browser language
    const initialLanguage = savedLanguage || (['en', 'es'].includes(browserLang) ? browserLang : 'en');

    // Get saved theme from local storage else set default theme
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Set initial state
    this._state.set({
      language: initialLanguage,
      theme: savedTheme,
    });

    // Set language and default language
    this.translate.use(initialLanguage);
    this.translate.setDefaultLang(initialLanguage);
    // Set theme
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  /**
   *  Get the current state as a read-only signal
   */
  get state() {
    return this._state.asReadonly();
  }

  /**
   *  Set the language and update the translation service
   * @param lang Language code (e.g., 'en' for English, 'es' for Spanish)
   */
  setLanguage(lang: string): void {
    this._state.update((current) => ({
      ...current,
      language: lang,
    }));
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    localStorage.setItem('language', lang);
  }

  /**
   *  Set the theme and update the document element
   * @param theme Theme name (e.g., 'light' for light theme, 'dark' for dark theme)
   */
  setTheme(theme: string): void {
    this._state.update((current) => ({
      ...current,
      theme: theme,
    }));
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }


}
