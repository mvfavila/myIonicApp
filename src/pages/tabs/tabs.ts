import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ActionSheetController, NavController } from 'ionic-angular';
import { AuthenticatedUser } from '../../user/user';
import { UsersService } from '../../user/user-service';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  private user: AuthenticatedUser;

  constructor(public actionSheetCtrl: ActionSheetController,
    private userService: UsersService,
    private navCtrl: NavController) {
      //this.getAuthUser();
  }

  private getAuthUser() {
    this.userService.getOnStorage().then(
      (user) => {
        this.user = AuthenticatedUser.ParseFromObject(user);

        if (this.user.token == null) {
          this.navCtrl.push(LoginPage)
        }
      }
    );
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
