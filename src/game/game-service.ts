import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiService } from '../api/api-service';
import { Game } from './game';
import { Player } from '../player/player';

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
  
  addPlayer(player: Player, game:Game): Promise<Game> {
      return new Promise((resolve, reject) => {
        this.apiService.postRequest('api/players', { player: player }, true).subscribe(
          res => {            
            game.players.push(Player.ParseFromObject(res));
            this.apiService.patchRequest('api/game', { game: { players: game.players } }, true)
            .subscribe(
              res => resolve(Game.ParseFromObject(res)),
              error => reject(<any>error)
            );
          },
          error => reject(<any>error)
        );
        
      });
  }  

}
