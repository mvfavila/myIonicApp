import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ActionSheetController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public actionSheetCtrl: ActionSheetController) {
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'New',
      buttons: [
        {
          text: 'Game',
          role: 'game',
          icon: 'help-buoy',
          handler: () => {
            console.log('Game clicked');
          }
        },{
          text: 'Player',
          icon: 'person-add',
          handler: () => {
            console.log('Player clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
}
