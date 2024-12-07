import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { GeneralValidators } from '../../../shared/validators/general-validators';
import { PasswordValidators } from '../../../shared/validators/password-validators';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgTemplateOutlet, NgClass],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  errorMessage: { [key: string]: string } = {};
  signUpForm: FormGroup = new FormGroup({
    userEmail: new FormControl<string | null>(null, [GeneralValidators.required(), GeneralValidators.email()]),
    userPassword: new FormControl<string | null>(null, [GeneralValidators.required(), GeneralValidators.minLength(8), PasswordValidators.strongPassword()]),
    confirmUserPassword: new FormControl<string | null>(null, [GeneralValidators.required(), PasswordValidators.matchPasswords('userPassword')]),
  });

  constructor(private translateService: TranslateService) {
    this.signUpForm.valueChanges.subscribe(() => {
      // console.log(this.signUpForm);
    });
  }


  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('Formulario enviado correctamente', this.signUpForm.value);
    }
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      console.log('Errores en el formulario', this.signUpForm.errors);
    }
  }

  getValidationMessage(controlName: string): string {

    const control = this.signUpForm.get(controlName);
    if (control?.errors) {

      const errorKey = Object.keys(control.errors)[0];
      const error = control.errors[errorKey];
      console.log(this.translateService.instant(`validation.${errorKey}`, error));
      return this.translateService.instant(`validation.${errorKey}`, error);
    } else {
      return '';
    }

  }
}
