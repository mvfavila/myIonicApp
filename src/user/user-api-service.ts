import { AuthenticatedUser } from "./user";
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { UsersService } from "./user-service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  private BASE_URL:string = "http://localhost:3000/";
  private user: AuthenticatedUser;  

  /* ---------------------------------------------------------------------------------------------------------------- */

  constructor(private userService: UsersService, private http: Http) {
     this.getAuthUser()
  }

  private getAuthUser() {
    this.userService.getOnStorage().then(
      (user) => {
        this.user = user;
      });      
  }

  /**
   * Get the Json Web Token from the local storage.
   *
   * @returns {RequestOptions}
   */
  private formatHeader(): RequestOptions {
    const headers: Headers = new Headers();
    if (this.user.token) {
      headers.append('Authorization', 'Bearer ' + this.user.token);
    }
    return new RequestOptions({ headers });
  }

  /**
   * Get the body of an HTTP response.
   *
   * @param res
   * @returns {any|{}}
   */
  private handleBody(res: Response) {
    return res.json() || {};
  }

  /**
   * Format the error message of an HTTP response.
   *
   * @param error
   * @returns {any}
   */
  private handleError(error: Response | any) {
    let errorModel: any = {};

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);

      errorModel = { status: error.status, message: `${error.status} - ${err.cause} ` };
    } else {
      errorModel = { status: error.status, message: error.toString()};
    }
    return Observable.throw(errorModel);
  }
  /* ---------------------------------------------------------------------------------------------------------------- */

  /**
   * Perform a PUT request.
   *
   * @param url
   * @param auth
   * @param body
   * @returns {Observable<>}
   */
  putRequest(url: string, body: Object, auth: boolean = true): Observable<Object> {
    let header = null;

    if (auth) {
      header = this.formatHeader();
    }
    return this.http
        .put(this.BASE_URL + url, body, header)
        .map((response:any) => {
          return this.handleBody(response);
        })
        .catch((err)=>{
            return this.handleError(err);
        });
  }

  /**
   * Perform a POST request.
   *
   * @param url
   * @param auth
   * @param body
   * @returns {Observable<>}
   */
  postRequest(url: string, body: Object, auth: boolean = true): Observable<Object> {
    let header = null;

    if (auth) {
      header = this.formatHeader();
    }
    return this.http.post(this.BASE_URL + url, body, header)
        .map((response:any) => {
            return this.handleBody(response);
        })
        .catch((err)=>{
            return this.handleError(err);
        });
  }

  /**
   * Perform a HEAD request.
   *
   * @param url
   * @param auth
   * @returns {Observable<>}
   */
  headRequest(url: string, auth: boolean = true): Observable<Object> {
    let header = null;

    if (auth) {
      header = this.formatHeader();
    }
    return this.http.head(this.BASE_URL + url, header)
        .map((response:any) => {
            return this.handleBody(response);
        })
        .catch((err)=>{
            return this.handleError(err);
        });
  }

  /**
   * Perform a GET request.
   *
   * @param url
   * @param auth
   * @returns {Promise<>}
   */
  getRequest(url: string, auth: boolean = true): Observable<Object> {
    let header = null

    if(auth) {
      header = this.formatHeader();
    }

    return this.http.get(this.BASE_URL + url, header)
        .map((response:any) => {
            return this.handleBody(response);
        })
        .catch((err)=>{
            return this.handleError(err);
        });
  }

  /**
   * Perform a DELETE request.
   *
   * @param url
   * @param auth
   * @returns {Observable<>}
   */
  deleteRequest(url: string, auth: boolean = true): Observable<Object> {
    let header = null;

    if (auth) {
      header = this.formatHeader();
    }
    return this.http.delete(this.BASE_URL + url, header)
        .map((response:any) => {
            return this.handleBody(response);
        })
        .catch((err)=>{
            return this.handleError(err);
        });
  }
}