import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticatedUser } from '../../user/user';
import { ApiService } from '../../user/user-api-service';
import { UsersService } from '../../user/user-service';

@Injectable()
export class AuthServiceProvider {  
  private _user: AuthenticatedUser;

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
      this.apiService.postRequest('api/users/login', { user: {email: email, password: password} }, false)
        .subscribe(
          res => resolve(AuthenticatedUser.ParseFromObject(res)),
          error => reject(<any>error));
    });
  }
 
  /**
   * Request an authentication access.
   *
   * @param username username
   * @param pass the password of the user
   * @returns {Promise<any>}
   */
  register(credentials) {
    if (credentials.username === null || credentials.pass === null) {
      return Observable.throw("Please insert credentials");
    }
    else { 
      var registrationCredentials = {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
      };
      this.apiService.postRequest('api/users', {user: registrationCredentials})
        .subscribe(
          res => this.userService.createOnStorage(AuthenticatedUser.ParseFromObject(res)),
          error => <any>error
      );

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
