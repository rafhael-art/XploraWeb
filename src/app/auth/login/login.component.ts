import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/models/base/base-response';
import { UserModel } from 'src/app/models/user/user-model.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private _fb = inject(FormBuilder)
  private _authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar)
  private _router = inject(Router)
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  formSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    this._authService.login(this.loginForm.value)
      .subscribe({
        next: (resp: BaseResponse<UserModel>) => {
          if (resp.isSucces) {
            this._snackBar.open(resp.message!, 'Cerrar', {
              duration: 1000
            })
            this._router.navigate(['/page']);
          } else {
            this._snackBar.open(resp.message!, 'Cerrar', {
              duration: 2000
            });
          }
        },
        error: (error) => this._snackBar.open("Error del servidor, Intentelo de nuevo más Tarde", "Cerrar")
      })
  }
}
