import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InterpolationParameters, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { AuthService } from '../auth-service/auth.service';
import { NgTemplateOutlet, NgClass } from '@angular/common';

import { IErrorFirebaseResponse } from '../auth-service/firebase-interfaces';
import { RouterModule } from '@angular/router';
import { ToastMessageComponent } from '../../shared/components/toast-message/toast-message.component';
import { AppStateService } from '../../shared/services/app-state/app-state.service';
import { ToastMessageService } from '../../shared/services/toast-message-service/toast-message.service';
import { GeneralValidators } from '../../shared/validators/general-validators';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgClass,
    ToastMessageComponent,
    LottieComponent,
    RouterModule
  ],
  providers: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  errorMessage: { [key: string]: string } = {};
  isLoading = false;
  passwordStrength = 0;
  signUpForm: FormGroup = new FormGroup({
    userEmail: new FormControl<string | null>(null, [GeneralValidators.required(), GeneralValidators.email()]),
    userPassword: new FormControl<string | null>(null, [GeneralValidators.required()]),
    rememberMe: new FormControl<boolean>(false),
  });

  // Eye animation password input
  private animationPasswordEye: AnimationItem | null = null;
  private animationConfirmPasswordEye: AnimationItem | null = null;
  tooltipVisibility = {
    userPassword: false,
  };
  showUserPassword = false;
  showUserConfirmPassword = false;
  tooltipText = {
    userPassword: '',
  };
  lottieOptions: AnimationOptions = {
    path: '/assets/animated-json/eye-password.json',
    autoplay: false,
    loop: false,
  };

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private toastService: ToastMessageService,
    private appStateService: AppStateService
  ) {}

  ngOnInit(): void {
    this.tooltipText = {
      userPassword: this.translateService.instant('tooltip.show-password')
    };
    // Check if remember me was previously set
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail) {
        this.signUpForm.patchValue({
          userEmail: savedEmail,
          rememberMe: true
        });
      }
    }
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

  togglePasswordVisibility(field: 'userPassword'): void {
    if (field === 'userPassword' && this.tooltipText) {
      this.showUserPassword = !this.showUserPassword;
      if (this.showUserPassword) {
        this.tooltipText['userPassword'] = this.translateService.instant('tooltip.hide-password')
        this.animationPasswordEye?.playSegments([0, 20], true);
      } else {
        this.tooltipText['userPassword'] = this.translateService.instant('tooltip.show-password')
        this.animationPasswordEye?.playSegments([20, 40], true);
      }
    }
  }

  /**
   * Handle the form submission and create a new user
   */
  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.authService.signIn(this.signUpForm.value.userEmail, this.signUpForm.value.userPassword).then(
        (singInResponse) => {
          console.log(singInResponse);
          const userId = singInResponse.user.uid;
          if (this.signUpForm.get('rememberMe')?.value) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('userEmail', this.signUpForm.value.userEmail);
          } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('userEmail');
          }
          this.showSuccessMessage('toast.login-success', { userName: singInResponse.user.displayName });
        }).catch((error: string) => {
          const serializedError: IErrorFirebaseResponse = JSON.parse(JSON.stringify(error));
          serializedError.customData._tokenResponse.error.errors.forEach((error: any) => {
            switch (error.message) {
              case 'EMAIL_EXISTS':
                this.showErrorMessage('toast.email-already-exists');
                break;
            }
          });
        }).finally(() => {
          this.isLoading = false;
        });
    }
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.showMissingFieldsErrorMessage();
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      this.isLoading = true;
      const result = await this.authService.signInWithGoogle();
      this.showSuccessMessage('toast.login-success', { userName: result.user.displayName });
    } catch (error) {
      this.showErrorMessage('toast.social-login-error');
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithFacebook(): Promise<void> {
    try {
      this.isLoading = true;
      const result = await this.authService.signInWithFacebook();
      this.showSuccessMessage('toast.login-success', { userName: result.user.displayName });
    } catch (error) {
      this.showErrorMessage('toast.social-login-error');
    } finally {
      this.isLoading = false;
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
  showSuccessMessage(key: string | string[], interpolateParams?: InterpolationParameters): void {
    this.toastService.showToast({
      type: 'success',
      message: this.translateService.instant(key, interpolateParams),
      duration: 3000,
    });
  }

  showErrorMessage(key: string | string[], interpolateParams?: InterpolationParameters): void {
    this.toastService.showToast({
      type: 'error',
      message: this.translateService.instant(key, interpolateParams),
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

