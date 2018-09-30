import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Player } from '../../player/player';

@IonicPage()
@Component({
  selector: 'page-add-player-modal',
  templateUrl: 'add-player-modal.html',
})
export class AddPlayerModalPage {

  /*
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
    }
  */

  player:Player;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController) {
      this.player = new Player();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  cancelAddPlayer() {
    this.closeModal();
  }

  addPlayer() {
    
  }

}
