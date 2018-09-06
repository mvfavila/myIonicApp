import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PlayerController } from '../../player/playerController';

@IonicPage()
@Component({
  selector: 'page-add-chips-modal',
  templateUrl: 'add-chips-modal.html',
})
export class AddChipsModalPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public playerCtrl: PlayerController) {
  }

  player = this.navParams.data;
  totalBuyIn = this.playerCtrl.getPlayerTotalBuyIn(this.navParams.data);
  addingChips = false;
  tableSettings = {
    buyInPace: 10
  };

  ionViewDidLoad() {
    console.log(this.player);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  openAddChips() {
    this.addingChips = true;
  }

  removePlayer(playerId) {

  }

  getBuyInPace(times) {
    if(times == null)
      times = 1;
    return this.tableSettings.buyInPace * times;
  }

}
