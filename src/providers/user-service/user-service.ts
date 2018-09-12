import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

//TODO: delete this page
@Injectable()
export class UserServiceProvider2 {

  baseUrl:string;
  data: any;
  
  constructor(public http: Http) {
    this.baseUrl = 'http://localhost:8080/';
    this.data = null;
  }

  public createUser(user){ 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post(this.baseUrl + 'api/users', JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        //TODO: call save in storage
        console.log(res.json());
      }); 
  }

  public getUser(login){ 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get(this.baseUrl + 'api/users/' + login)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    }); 
  }
  
  public getToken(credentials) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    return new Promise(resolve => { 

      this.http.post(this.baseUrl + 'api/users/token/', JSON.stringify(credentials), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });

    }); 
  }

}
