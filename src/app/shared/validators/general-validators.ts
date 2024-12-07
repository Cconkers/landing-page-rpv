import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class GeneralValidators {
  static required(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value || control.value.trim() === ''
        ? { required: true }
        : null;
    };
  }

  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return control.value && !emailRegex.test(control.value)
        ? { email: true }
        : null;
    };
  }

  static minLength(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value.length < length
        ? { minlength: { requiredLength: length, actualLength: control.value.length } }
        : null;
    };
  }

  static pattern(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && !pattern.test(control.value)
        ? { pattern: true }
        : null;
    };
  }
}
