import { Component } from '@angular/core';
import { DarkLightSwitcherComponent } from '../dark-light-switcher/dark-light-switcher.component';
import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown.component';

@Component({
    selector: 'app-navbar',
    imports: [DarkLightSwitcherComponent, LanguageDropdownComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
