import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
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