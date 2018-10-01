import { Injectable } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';
import { AddChipsModalPage } from '../pages/add-chips-modal/add-chips-modal';
import { GameServiceProvider } from './game-service';
import { GameStorage } from './game-storage';
import { AddPlayerModalPage } from '../pages/add-player-modal/add-player-modal';
import { Player } from '../player/player';

@Injectable()
export class GameController {

     public items = [];        
     private game;

    constructor(public events: Events,
                public modalCtrl: ModalController,
                private gameService: GameServiceProvider,
                private gameStorage: GameStorage) {

        //Historico (with 'teams' and without 'team')
        //  Repetir ultimo jogo (perguntando quantas fichas colocar para cada jogador)
        //
        
        this.items = [];
               
        events.subscribe('player:adding', () => {
            this.openAddPlayerModal();
        });
        events.subscribe('player:added', (player:Player) => {
            // todo: persist information
            this.items.push(player);
        });     
        events.subscribe('player:updated', (player) => {
            var index = this.items.indexOf(player);
            if(index < 0){
                //TODO: error. Player not found
            }
            else{
                this.items[index] = player;
            }
        });        
        events.subscribe('player:selected', (id) => {
            var player = this.items.filter(function(item){
                return item.id === id;
            })[0];

            this.openAddChipsModal(player);
        });       
        events.subscribe('player:removed', (player, gameId, chipsCount) => {
            var index = this.items.indexOf(player);
            if(index < 0){
                //TODO: error. Player not found
            }  
            else {
                //TODO: register balance
                this.items.splice(index, 1);
            }       
        });
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
            this.items = data.players;
            this.game = data;
            this.gameStorage.createOnStorage(data);
        })
        .catch(err => {
            var msg = err;
        });
    }
}