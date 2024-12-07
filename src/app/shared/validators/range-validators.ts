import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RangeValidators {
  static minValue(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value !== null && control.value < min
        ? { minValue: { min, actual: control.value } }
        : null;
    };
  }

  static maxValue(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value !== null && control.value > max
        ? { maxValue: { max, actual: control.value } }
        : null;
    };
  }

  static range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value !== null && (control.value < min || control.value > max)
        ? { range: { min, max, actual: control.value } }
        : null;
    };
  }
}
