import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserRegister } from '../models/user/user-register.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BaseResponse } from '../models/base/base-response';
import { UserLogin } from '../models/user/user-login.interface';
import { UserModel } from '../models/user/user-model.interface';
import { UserEditProfile } from '../models/user/user-edit-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private user!: BehaviorSubject<UserModel>;

  constructor() {
    super();
    if (localStorage.getItem('user'))
      this.user = new BehaviorSubject<UserModel>(
        JSON.parse(localStorage.getItem('user')!)
      )
  }
  get getUser(): UserModel | null {
    if (this.user)
      return this.user.value;
    return null
  }

  register(data: UserRegister): Observable<BaseResponse<number>> {
    return this._http.post<BaseResponse<number>>(`${this.BASE_URL}/User/Register`, data);
  }

  validateEmail(email: string, userId: number): Observable<boolean> {
    return this._http.get<BaseResponse<boolean>>(`${this.BASE_URL}/User/ValidateEmail?email=${email}&userId=${userId}`)
      .pipe(map(res => {
        return res.data!;
      }));

  }

  editProfile(data: UserEditProfile): Observable<BaseResponse<UserModel>> {
    data.userId = this.getUser?.userId!;
    return this._http.put<BaseResponse<UserModel>>(`${this.BASE_URL}/User/Edit`, data)
      .pipe(
        map((resp: BaseResponse<UserModel>) => {
          if (resp.isSucces) {
            this.user?.next(resp.data!)
            localStorage.setItem("user", JSON.stringify(resp.data!))
          }
          return resp;
        })
      );
  }

  login(data: UserLogin): Observable<BaseResponse<UserModel>> {
    return this._http.post<BaseResponse<UserModel>>(`${this.BASE_URL}/User/Login`, data)
      .pipe(
        map((resp: BaseResponse<UserModel>) => {
          if (resp.isSucces) {
            this.user?.next(resp.data!)
            localStorage.setItem("user", JSON.stringify(resp.data!))
          }
          return resp;
        })
      );
  }

  logOut() {
    localStorage.removeItem("user");
  }
}
