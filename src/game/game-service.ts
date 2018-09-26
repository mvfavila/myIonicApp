import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiService } from '../api/api-service';
import { Game } from './game';

@Injectable()
export class GameServiceProvider {  

  public constructor(public http: Http,
    private apiService: ApiService) {
      
  }

  /* ---------------------------------------------------------------------------------------------------------------- */

  create(): Promise<any> {    
    return new Promise((resolve, reject) => {
      this.apiService.postRequest('api/games', {}, true).subscribe(
        res => resolve(Game.ParseFromObject(res)),
        error => reject(<any>error)        
      );
    });  
  }

}
