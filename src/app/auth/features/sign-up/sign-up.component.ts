import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { GeneralValidators } from '../../../shared/validators/general-validators';
import { PasswordValidators } from '../../../shared/validators/password-validators';
import { AuthService } from '../auth-service/auth.service';
import { ToastMessageComponent } from "../../../shared/components/toast-message/toast-message-component/toast-message.component";
import { ToastMessageService } from '../../../shared/services/toast-message-service/toast-message.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgTemplateOutlet, NgClass, ToastMessageComponent, ToastMessageComponent],
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

  constructor(private translateService: TranslateService, private authService: AuthService, private toastService: ToastMessageService) {
  }


  onSubmit(): void {
    this.showSuccessMessageNewUserCreated();
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value.userEmail, this.signUpForm.value.userPassword).then((user) => {
        console.log(user);
      }).catch((error) => {
        console.log('Error al registrar usuario', error);
      });
    }
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
    }
  }

  getValidationMessage(controlName: string): string {
    const control = this.signUpForm.get(controlName);
    if (control?.errors) {
      const errorKey = Object.keys(control.errors)[0];
      const error = control.errors[errorKey];
      return this.translateService.instant(`validation.${errorKey}`, error);
    } else {
      return '';
    }
  }

  showSuccessMessageNewUserCreated(): void {
    this.toastService.showToast({
      type: 'success',
      message: this.translateService.instant('toast.new-user-created'),
      duration: 3000,
    });
  }

}
