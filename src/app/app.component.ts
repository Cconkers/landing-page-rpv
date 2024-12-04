import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'landing-page-rpv';

  toggleTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    console.log(1, theme);

    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
    console.log(2,theme);
  }

}
