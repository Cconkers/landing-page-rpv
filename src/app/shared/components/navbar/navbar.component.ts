import { Component } from '@angular/core';
import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown.component';

@Component({
    selector: 'app-navbar',
    imports: [LanguageDropdownComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
