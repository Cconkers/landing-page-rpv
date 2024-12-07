import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dark-light-switcher',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dark-light-switcher.component.html',
  styleUrl: './dark-light-switcher.component.scss'
})
export class DarkLightSwitcherComponent {
  toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Guardar preferencia del usuario
  }

  getChangeThemeMessage(): string {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    return currentTheme === 'dark' ? 'theme-switcher.light' : 'theme-switcher.dark';
  }
}
