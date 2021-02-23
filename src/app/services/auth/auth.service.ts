import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ErrorHandler } from '../../shared/error-handler';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cart-item';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { UserData } from '../../models/user-data';
import { CartService } from '../cart/cart.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  _registerUrl = `http://localhost:3000/auth/register`;
  _loginUrl = `http://localhost:3000/auth/login`;
  _userUrl = `http://localhost:3000/auth/current-user`;
  _profileUrl = `http://localhost:3000/profile`;
  private _usersURL = `http://localhost:3000/auth/system-users`;
  private _userDataURL = `http://localhost:3000/auth/user-main-data`;

  private imageChangeUrl = `http://localhost:3000/profile/userprofile/changeprofileimage`;
  private newImageUrl = `http://localhost:3000/profile/userprofile/setprofileimage`;
  private contactUrl = `http://localhost:3000/contacts/new-mail`;

  errorsHandler = new ErrorHandler();
  public username: string;
  public cart: Cart;
  public cartItem: CartItem;
  public profile: Profile;
  public currentUser: User;


  constructor(private _http: HttpClient,
              private _router: Router,
              private _cartService: CartService) { }



  registerUser(registrationInfo): Observable<void> {
    return this._http.post<void>(this._registerUrl, registrationInfo);
  }

  prepareUserData() {
    if (this.isLoggedIn()) {
      this.getCurrentUser().subscribe(resUser => {
        this.currentUser = resUser;
      });
      this.pUserData().subscribe(uData => {
        this.profile = uData.profile;
        this.username = `${uData.profile.firstname}
        ${uData.profile.lastname}`;
      });
    }
  }

  refreshInfo() {
    if (this.isLoggedIn()) {
      this.pUserData().subscribe(uData => {
        this.profile = uData.profile;
        this.cart = uData.cart;
        this.cartItem = uData.cartItem;
      });
    }
  }

  pUserData(): Observable<UserData> {
    try {
      return this._http.get<UserData>(this._userDataURL);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  messageContact(messageForm: any): Observable<void> {
    try {
      return this._http.post<void>(this.contactUrl, messageForm);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  updateProfile(updateForm): Observable<Profile> {
    try {
      return this._http.put<Profile>(
        `${this._profileUrl}/userprofile/edit`,
        updateForm
      );
    } catch (error) {
      this.errorsHandler.handleError(error);
    }
  }

  getCurrentUser(): Observable<User> {
    try {
      return this._http.get<User>(`${this._userUrl}`);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  changeProfileImage(imageForm): Observable<Profile> {
    try {
      return this._http.patch<Profile>(this.imageChangeUrl, imageForm);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  addProfileImage(imageForm): Observable<Profile> {
    try {
      return this._http.post<Profile>(this.newImageUrl, imageForm);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  getUsers(): Observable<User[]> {
    try {
      return this._http.get<User[]>(this._usersURL);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  login(user: any): Observable<any> {
    try {
      return this._http.post<any>(this._loginUrl, user);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  getUserProfile(): Observable<Profile> {
    try {
      return this._http.get<Profile>(this._profileUrl);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  userLogout() {
    this._router.navigate(["/auth/login"]);
    return localStorage.removeItem("token");
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }
}

