import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController } from 'ionic-angular';
import { PlayerController } from '../../player/playerController';
import { AboutPage } from '../about/about';

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
    public events: Events,
    private alertCtrl: AlertController) {
      this.loadTableSettings();
  }

  player = this.navParams.data;
  totalBuyIn = this.playerCtrl.getPlayerTotalBuyIn(this.navParams.data);
  addingChips = false;
  tableSettings = {
    buyInPace: 10
  };
  buyIn:number = 0;

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

  removePlayerClick() {
    this.presentRemovePlayerPrompt(this.player.nickname);
  }

  removePlayer(chipsCount){
    var gameId = 0;
    this.events.publish('player:removed', this.player, gameId, chipsCount);
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
    this.totalBuyIn = this.player.buyInCount;
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
    this.buyIn = null;
    this.navCtrl.push(AboutPage);
  }

  updatePlayer() {
    this.events.publish('player:updated', this.player);
  }

  presentRemovePlayerPrompt(name) {
    let alert = this.alertCtrl.create({
      title: 'Remove ' + name,
      message: 'Inform the player chips count',
      inputs: [
        {
          name: 'chipsCount',
          placeholder: 'Chips count',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {            
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.removePlayer(data.chipsCount);
            this.navCtrl.push(AboutPage);
          }
        }
      ]
    });
    alert.present();
  }

}
