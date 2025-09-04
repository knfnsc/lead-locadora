import { AbstractControl, ValidationErrors } from "@angular/forms";

export function notEmpty(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return value === null ||
    value === undefined ||
    String(value).trim().length === 0
    ? { notEmpty: true }
    : null;
}
