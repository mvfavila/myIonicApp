import { Component } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';
import { AddChipsModalPage } from '../pages/add-chips-modal/add-chips-modal';

@Component({
    selector: 'game-controller'
})
export class GameController {
    constructor(public events: Events,
                public modalCtrl: ModalController) {
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
        events.subscribe('player:selected', (id) => {
            var player = this.items.filter(function(item){
                return item.id === id;
            })[0];

            this.openAddChipsModal(player);
        });
    }

    openAddChipsModal(player) {
        const modal = this.modalCtrl.create(AddChipsModalPage, player);
        modal.present();
    }

    items = [];
}