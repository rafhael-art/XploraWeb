import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

export function EmailCheck(api: AuthService, userId: number): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return api.validateEmail(control.value, userId)
      .pipe(
        map(resp => resp ? { emailExists: true } : null)
      )
  }
}
