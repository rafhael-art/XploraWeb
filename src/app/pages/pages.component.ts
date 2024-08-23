import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/user/user-model.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './pages.component.html',
  styles: [`
  .example-spacer {
  flex: 1 1 auto;
}
  `]
})
export class PagesComponent implements OnInit {
  user!: UserModel;
  private _authService = inject(AuthService);
  private _router = inject(Router)
  ngOnInit(): void {
    this.user = this._authService.getUser!;
  }

  signOut() {
    this._authService.logOut();
    document.location.reload();
  }

}
