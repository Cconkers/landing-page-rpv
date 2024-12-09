import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { GeneralValidators } from '../../../shared/validators/general-validators';
import { PasswordValidators } from '../../../shared/validators/password-validators';
import { AuthService } from '../auth-service/auth.service';
import { ToastMessageComponent } from "../../../shared/components/toast-message/toast-message.component";
import { ToastMessageService } from '../../../shared/services/toast-message-service/toast-message.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgTemplateOutlet, NgClass, ToastMessageComponent, ToastMessageComponent, LottieComponent, JsonPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  errorMessage: { [key: string]: string } = {};
  signUpForm: FormGroup = new FormGroup({
    userEmail: new FormControl<string | null>(null, [GeneralValidators.required(), GeneralValidators.email()]),
    userPassword: new FormControl<string | null>(null, [GeneralValidators.required(), GeneralValidators.minLength(8), PasswordValidators.strongPassword()]),
    confirmUserPassword: new FormControl<string | null>(null, [GeneralValidators.required(), PasswordValidators.matchPasswords('userPassword')]),
  });

  // Eye animation password input
  private animationPasswordEye: AnimationItem | null = null;
  private animationConfirmPasswordEye: AnimationItem | null = null;
  tooltipVisibility = {
    userPassword: false,
    confirmUserPassword: false,
  };
  showUserPassword = false;
  showUserConfirmPassword = false;
  tooltipText = {
    userPassword: '',
    confirmUserPassword: '',
  };
  lottieOptions: AnimationOptions = {
    path: '/assets/animated-json/eye-password.json',
    autoplay: false,
    loop: false,
  };

  constructor(private translateService: TranslateService, private authService: AuthService, private toastService: ToastMessageService, private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.tooltipText = {
      userPassword: this.translateService.instant('tooltip.show-password'),
      confirmUserPassword: this.translateService.instant('tooltip.show-password'),
    };
  }

  showTooltip(tooltipToShow: string) {
    this.tooltipVisibility[tooltipToShow as keyof typeof this.tooltipVisibility] = true;
  }

  hideTooltip(tooltipToShow: string) {
    this.tooltipVisibility[tooltipToShow as keyof typeof this.tooltipVisibility] = false;
  }


  animationPasswordCreated(animationItem: AnimationItem): void {
    this.animationPasswordEye = animationItem;
    this.animationPasswordEye.setSpeed(4);
  }

  animationConfirmPasswordCreated(animationItem: AnimationItem): void {
    this.animationConfirmPasswordEye = animationItem;
    this.animationConfirmPasswordEye.setSpeed(4);
  }

  togglePasswordVisibility(field: 'userPassword' | 'confirmUserPassword'): void {
    if (field === 'userPassword' && this.tooltipText) {
      this.showUserPassword = !this.showUserPassword;
      if (this.showUserPassword) {
        this.tooltipText['userPassword'] = this.translateService.instant('tooltip.hide-password')
        this.animationPasswordEye?.playSegments([0, 20], true);
      } else {
        this.tooltipText['userPassword'] = this.translateService.instant('tooltip.show-password')
        this.animationPasswordEye?.playSegments([20, 40], true);
      }

    } else if (field === 'confirmUserPassword' && this.tooltipText) {
      this.showUserConfirmPassword = !this.showUserConfirmPassword;
      if (this.showUserConfirmPassword) {
        this.tooltipText['confirmUserPassword'] = this.translateService.instant('tooltip.hide-password')
        this.animationConfirmPasswordEye?.playSegments([0, 20], true);
      } else {
        this.tooltipText['confirmUserPassword'] = this.translateService.instant('tooltip.show-password')
        this.animationConfirmPasswordEye?.playSegments([20, 40], true);
      }
    }
  }

  /**
   * Handle the form submission and create a new user
   */
  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value.userEmail, this.signUpForm.value.userPassword).then((user) => {
        console.log(user);
        this.showSuccessMessageNewUserCreated();
      }).catch((error) => {
        console.log('Error al registrar usuario', error);
      });
    }
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.showMissingFieldsErrorMessage();
    }
  }

  /**
   *  Get the validation message for a specific control
   * @param controlName  Name of the control to get the validation message for
   * @returns  The validation message for the specified control
   */
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

  /**
   * Show a success message when a new user is created
   */
  showSuccessMessageNewUserCreated(): void {
    this.toastService.showToast({
      type: 'success',
      message: this.translateService.instant('toast.new-user-created'),
      duration: 3000,
    });
  }
  showMissingFieldsErrorMessage(): void {
    const actualToast = this.toastService._messages()[this.toastService._messages().length - 1];
    if (actualToast && actualToast.message === this.translateService.instant('toast.missing-fields')) {
      return;
    } else {
      this.toastService.showToast({
        type: 'error',
        message: this.translateService.instant('toast.missing-fields'),
        duration: 3000,
      });
    }
  }
}
