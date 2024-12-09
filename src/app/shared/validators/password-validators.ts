import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
      return control.value && !strongPasswordRegex.test(control.value)
        ? { strongPassword: true }
        : null;
    };
  }

  static matchPasswords(controlToMatch: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (parent) {
        const matchControl = parent.get(controlToMatch);
        if (matchControl && matchControl.value !== control.value) {
          console.log(matchControl.value);
          console.log(control.value);

          return { matchPasswords: true };
        }
      }
      return null;
    };
  }
}
