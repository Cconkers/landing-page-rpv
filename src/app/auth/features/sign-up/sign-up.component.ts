import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  errorMessage: { [key: string]: string } = {};

  constructor(private translate: TranslateModule) { }

  setCustomValidity(event: Event): void {
    const input = event.target as HTMLInputElement;
    const validity = input.validity;

    if (input.name === 'email') {
      this.errorMessage['email'] = this.getEmailErrorKey(validity);
    } else if (input.name === 'password') {
      this.errorMessage['password'] = this.getPasswordErrorKey(validity);
    }
  }

  resetCustomValidity(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.errorMessage[input.name] = ''; // Limpia el mensaje al escribir
  }

  getEmailErrorKey(validity: ValidityState): string {
    if (validity.valueMissing) {
      return 'validation.email.valueMissing';
    } else if (validity.typeMismatch) {
      return 'validation.email.typeMismatch';
    } else if (validity.tooLong) {
      return 'validation.email.tooLong';
    }
    return '';
  }

  getPasswordErrorKey(validity: ValidityState): string {
    if (validity.valueMissing) {
      return 'validation.password.valueMissing';
    } else if (validity.tooShort) {
      return 'validation.password.tooShort';
    } else if (validity.patternMismatch) {
      return 'validation.password.patternMismatch';
    }
    return '';
  }
}
