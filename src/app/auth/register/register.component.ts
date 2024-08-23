import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { passwordsMatchValidator } from 'src/app/shared/functions/password.validators';
import { BaseResponse } from 'src/app/models/base/base-response';
import { AuthService } from 'src/app/services/auth.service';
import { EmailCheck } from 'src/app/shared/functions/email-check.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  private _fb = inject(FormBuilder)
  registerForm!: FormGroup;
  private _authService = inject(AuthService);
  private _router = inject(Router)
  private _snackBar = inject(MatSnackBar)


  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.registerForm = this._fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [EmailCheck(this._authService, 0)]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: passwordsMatchValidator('password', 'password2'),
      updateOn: 'blur'
    });

  }

  formSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;
    this._authService.register(this.registerForm.value)
      .subscribe({
        next: (resp: BaseResponse<number>) => {
          if (resp.isSucces) {

            this._snackBar.open(resp.message!, 'Cerrar', {
              duration: 2000
            }).afterDismissed()
              .subscribe(() => this._router.navigate(['/login']));
          } else {
            this._snackBar.open(resp.message!);
          }
        },
        error: (error) => this._snackBar.open("Error del servidor, Intentelo de nuevo más Tarde", "Cerrar")
      });

  }
}
