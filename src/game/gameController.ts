import { Component } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';
import { AddChipsModalPage } from '../pages/add-chips-modal/add-chips-modal';

@Component({
    selector: 'game-controller'
})
export class GameController {
    constructor(public events: Events,
                public modalCtrl: ModalController) {

        //Historico (with 'teams' and without 'team')
        //  Repetir ultimo jogo (perguntando quantas fichas colocar para cada jogador)
        //

        this.items = [
            {
                id: 0,
                nickname: 'N@nt0',
                name: 'Sicrano',
                surname: 'Da Silva',
                buyInCount: 300,
                buyIns: [
                    {
                        amount: 100,
                        date: '2018-09-04'
                    },
                    {
                        amount: 200,
                        date: '2018-09-04'
                    }
                ]              
            },
            {
                id: 1,
                nickname: 'T1lt@ndo',
                name: 'Fulano',
                surname: 'Da Silva',
                buyInCount: 50,
                buyIns: [
                    {
                        amount: 10,
                        date: '2018-09-03'
                    },
                    {
                        amount: 10,
                        date: '2018-09-04'
                    },
                    {
                        amount: 30,
                        date: '2018-09-05'
                    }
                ]
            }
        ];
        events.subscribe('player:added', (name) => {
            var newPlayer = {
                id: 2,
                nickname: 'N3wb1',
                name: 'Joao',
                surname: 'Grilo',
                buyInCount: 0,
                buyIns: []
            };
            this.items.push(newPlayer);
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

    items = [];
}