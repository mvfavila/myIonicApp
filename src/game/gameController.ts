import { Injectable } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';
import { AddChipsModalPage } from '../pages/add-chips-modal/add-chips-modal';
import { GameServiceProvider } from './game-service';
import { GameStorage } from './game-storage';
import { AddPlayerModalPage } from '../pages/add-player-modal/add-player-modal';
import { Player } from '../player/player';
import { Game } from './game';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GameController {
       
    private _game:Game;

    constructor(public events: Events,
                public modalCtrl: ModalController,
                private gameService: GameServiceProvider,
                private gameStorage: GameStorage) {

        //Historico (with 'teams' and without 'team')
        //  Repetir ultimo jogo (perguntando quantas fichas colocar para cada jogador)
        //
        
        this.loadGame();
               
        events.subscribe('player:adding', () => {
            this.openAddPlayerModal();
        });
        events.subscribe('player:added', (player:Player) => {
            this.playerAdded(player);
        });     
        events.subscribe('player:updated', (player) => {
            var index = this._game.players.indexOf(player);
            if(index < 0){
                //TODO: error. Player not found
            }
            else{
                this._game.players[index] = player;
            }
        });        
        events.subscribe('player:selected', (id:string) => {
            var player = this._game.players.filter(function(item){
                return item.playerId === id;
            })[0];

            this.openAddChipsModal(player);
        });       
        events.subscribe('player:removed', (player, gameId, chipsCount) => {
            var index = this._game.players.indexOf(player);
            if(index < 0){
                //TODO: error. Player not found
            }  
            else {
                //TODO: register balance
                this._game.players.splice(index, 1);
            }       
        });
    }

    private loadGame() {
        this.gameStorage.getOnStorage()
        .then(game => {
            this._game = game;
        })
        .catch(err => {
            // todo: what should happen here?
            throw new Error("Could not load game. " + err);
        });
    }

    players():Player[] {
        return this._game.players;
    }

    openAddChipsModal(player) {
        const modal = this.modalCtrl.create(AddChipsModalPage, player);
        modal.present();
    }

    openAddPlayerModal() {
        const modal = this.modalCtrl.create(AddPlayerModalPage);
        modal.present();
    }

    initNewQuickGame() {
        this.createGame();
    }

    private createGame() {        
        this.gameService.create()
        .then(data => {
            this._game = data;
            this.gameStorage.createOnStorage(this._game);
        })
        .catch(err => {
            throw new Error("Could not create game. " + err);
        }); 
    }

    private playerAdded(player: Player): any {
        this.addPlayerToGame(player);
    }

    private addPlayerToGame(player:Player) { 
        this.gameStorage.getOnStorage()
        .then(game => {
            if(this.isPlayerInGame(player)){

            }
            else{                
                game.players.push(player);
                // add to local storage
                this.gameStorage.updateOnStorage(game);
                this._game = game;
                this.gameService.addPlayer(player, game);
            }
        })
        .catch(err => {
            throw new Error("Could not add player to thee game. " + err);
        });
    }

    private isPlayerInGame(player:Player): boolean{
        var playerFound = this._game.players.find((p) => {
            return p.playerId && p.playerId === player.playerId;
        });
        return playerFound === null;

        // todo: test this
    }
}