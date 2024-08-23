import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { BaseResponse } from 'src/app/models/base/base-response';
import { UserModel } from 'src/app/models/user/user-model.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EmailCheck } from 'src/app/shared/functions/email-check.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user !: UserModel;
  private _fb = inject(FormBuilder)
  profileForm!: FormGroup;
  private _authService = inject(AuthService);
  private _router = inject(Router)
  private _snackBar = inject(MatSnackBar)

  constructor() {
    this.user = this._authService.getUser!;
  }

  ngOnInit(): void {
    this.initForm()
    this.profileForm.patchValue(this.user)
  }



  initForm() {
    this.profileForm = this._fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], EmailCheck(this._authService, this.user.userId)],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  formSubmit() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) return;

    this._authService.editProfile(this.profileForm.value)
      .subscribe({
        next: (resp: BaseResponse<UserModel>) => {
          if (resp.isSucces) {
            this._snackBar.open(resp.message!, 'Cerrar');
            this.user = this._authService.getUser!;
            this.profileForm.patchValue(this.user)
          } else {
            this._snackBar.open(resp.message!);
          }
        },
        error: (error) => this._snackBar.open("Error del servidor, Intentelo de nuevo más Tarde", "Cerrar")
      });
  }
}
