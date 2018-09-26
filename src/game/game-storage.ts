import { Subject } from "rxjs/Subject";
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { Game } from "./game";

@Injectable()
export class GameStorage {
    
    private _game: Subject<Game> = new Subject<Game>();
    private STORAGE_NAME:string = 'game';
  
    constructor(private storage: Storage) {
      
    }
  
    /* ---------------------------------------------------------------------------------------------------------------- */
    /* Observable use object                                                                                            */
  
    public subscribeToGameService(callback) {
      return this._game.subscribe(callback);
    }
  
    public updateGameStorage(game: Game) {
      this._game.next(game);
    }
  
    /* ---------------------------------------------------------------------------------------------------------------- */
    /* User storage management                                                                                          */
  
    /**
     * Write game properties in the local storage.
     *
     * @param game
     * @returns {Promise<Game>}
     */
    createOnStorage(game: Game): Promise<Game> {      
      return new Promise((resolve) => {
        this.getOnStorage().then((res) => {
          if (res) {
            this.deleteOnStorage().then(() => {
  
            });
          }
        }).then(() => {
          this.updateGameStorage(game);
          this.storage.set(this.STORAGE_NAME, JSON.stringify(game));
          resolve();
        });
      });
    }
  
    /**
     * Get game properties from local storage.
     *
     * @returns {Promise<Game>}
     */
    getOnStorage(): Promise<Game> {
      return new Promise((resolve) => {
        this.storage.get(this.STORAGE_NAME).then(
          (game) => {
            var gameObj = Game.ParseFromObject(game);
            this.updateGameStorage(gameObj);
            resolve(gameObj);
          }
        );
      });
    }
  
    /**
     * Get game properties from local storage.
     *
     * @returns {Promise<Game>}
     */
    getOnStorageSync() {
      var game = Game.ParseFromObject(this.storage.get(this.STORAGE_NAME));
      this.updateGameStorage(game);
      return this.storage.get(this.STORAGE_NAME);
    }
  
    /**
     * Update game properties from local storage.
     *
     * @param game
     * @returns {Promise<Game>}
     */
    updateOnStorage(game: Game): Promise<Game> {
      return new Promise((resolve) => {
        resolve(this.storage.get(this.STORAGE_NAME));
      });
    }
  
    /**
     * Delete game properties from local storage.
     *
     * @returns {Promise<Game>}
     */
    deleteOnStorage(): Promise<Game> {
      return new Promise((resolve) => {
        this.storage.clear();
        resolve();
      });
    }
  }
