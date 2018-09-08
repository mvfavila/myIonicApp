import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
    selector: 'player-controller'
})
export class PlayerController {
    constructor(public events: Events) {}

    getPlayerTotalBuyIn(player) {
        console.log(player);
        var total:number = 0;
        player.buyIns.forEach(element => {
            total += parseFloat(element.amount.toString());
        });
        return total;
    }

    items = [];
}