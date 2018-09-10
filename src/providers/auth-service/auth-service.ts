import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserServiceProvider } from '../user-service/user-service';

export class User {
  id: string;
  nickName: string;
  email: string;
  pass: string;
 
  constructor(nickName: string, email: string, pass: string) {
    this.nickName = nickName;
    this.email = email;
    this.pass = pass;
  }
}

@Injectable()
export class AuthServiceProvider {  
  currentUser: User;
  hasTokken:boolean;

  //TODO: delete constructor and search for data
  public constructor(public http: Http,
    private userService: UserServiceProvider) {
    //this.currentUser = new User('Vinicius', 'vinicius@email.com');
    //this.hasTokken = true;    
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        var user = this.userService.createUser(credentials.email);
        console.log('Here is your user');
        console.log(user);
        
        //TODO: make a request to backend to make a real check. Store a token?
        let access = (credentials.password === "Pass" && credentials.email === "Email");
        this.currentUser = new User('Vinicius', 'vinicius@email.com', credentials.password);
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      
      this.userService.createUser(credentials);

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  isLoggedIn(): boolean {
    return this.hasTokken;
  }

}
