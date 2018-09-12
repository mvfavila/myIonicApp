import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticatedUser } from '../../user/user';
import { ApiService } from '../../user/user-api-service';
import { UsersService } from '../../user/user-service';

export class User {
  private _id: string;
  private _nickName: string;
  private _email: string;
  private _pass: string;
  private _token:string;
 
  constructor(nickName: string, email: string, pass: string) {
    this._nickName = nickName;
    this._email = email;
    this._pass = pass;
  }
}

@Injectable()
export class AuthServiceProvider {  
  private _user: AuthenticatedUser;
  hasTokken:boolean;

  //TODO: delete constructor and search for data
  public constructor(public http: Http,
    private userService: UsersService,
    private apiService: ApiService) {
      this.getAuthUser();
  }

  public static GetNewInstance(): AuthenticatedUser {
    return new AuthenticatedUser(null, null, null)
  }

  getAuthUser() {
    this.userService.getOnStorage().then(
       (user) => {
         this._user = user;
       }
    );
  }

  /* ---------------------------------------------------------------------------------------------------------------- */

  /**
   * Request an authentication access.
   *
   * @param email the email of the user
   * @param password the password of the user
   * @returns {Promise<any>}
   */
  login(email: string, password: string): Promise<AuthenticatedUser> {
    return new Promise((resolve, reject) => {
      this.apiService.postRequest('/auth', {email: email, password: password})
        .subscribe(
          res => resolve(AuthenticatedUser.ParseFromObject(res)),
          error => reject(<any>error));
    });
  }
 
  /**
   * Request an authentication access.
   *
   * @param email the email of the user
   * @param password the password of the user
   * @returns {Promise<any>}
   */
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      
      this.userService.createOnStorage(credentials);

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : AuthenticatedUser {
    return this._user;
  }
 
  /**
   * Logout a user from the authentication process.
   *
   * @returns {Promise<any>}
   */
  logout(): Promise<any> {
    return new Promise((resolve) => {
      this.userService.deleteOnStorage().then(() => {
        resolve();
      });
    });
  }

  /**
   * Check whether a user is already logged in.
   *
   * @returns {boolean}
   */
  isLoggedIn(): boolean {
    if (this._user.token) {
      return true;
    } else {
      return false;
    }
  }

}
