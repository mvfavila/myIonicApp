import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { GameController } from '../../game/gameController';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,
              public events: Events,
              public gameController: GameController) {

                this.items = gameController.items;
  }

  items = [];

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
