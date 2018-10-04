import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { GameController } from '../../game/gameController';
import { Player } from '../../player/player';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  players: Player[] = [];  

  constructor(public navCtrl: NavController,
              public events: Events,
              public gameController: GameController) {                
                this.players = this.gameController.players();
  }

  itemSelected(id: number) {
    this.events.publish('player:selected', id);
  }

  openAddPlayer() {
    this.events.publish('player:adding');
  }

  addPlayer(name: string) {
    this.events.publish('player:added', name);
  }

}
