import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
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
    public playerCtrl: PlayerController,
    public events: Events) {
      this.loadTableSettings();
  }

  player = this.navParams.data;
  totalBuyIn = this.playerCtrl.getPlayerTotalBuyIn(this.navParams.data);
  addingChips = false;
  tableSettings = {
    buyInPace: 10
  };
  buyIn: 0;

  ionViewDidLoad() {
  }

  loadTableSettings() {
    //todo: load table settings
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  openAddChips() {
    this.addingChips = true;
  }

  removePlayer(playerId) {
    //todo: update player
  }

  cancelAddChips() {
    this.closeAddChips();
  }

  addBuyIn() {
    var newBuyIn = {
      amount: this.buyIn,
      date: Date.now().toString()
    };
    this.player.buyIns.push(newBuyIn);
    this.closeAddChips();
    this.updatePlayer();
  }

  getBuyInPace(times) {
    if(times == null)
      times = 1;
    return this.tableSettings.buyInPace * times;
  }

  closeAddChips() {    
    this.addingChips = false;
    this.buyIn = 0;
  }

  updatePlayer() {
    this.events.publish('player:updated', this.player);
  }

}
