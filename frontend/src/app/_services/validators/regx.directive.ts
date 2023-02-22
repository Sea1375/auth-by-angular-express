import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function regxValidator(regx: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = regx.test(control.value)
    return forbidden ? null : {forbidden: regx}
  }
}

