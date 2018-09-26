import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { GameController } from '../../game/gameController';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController,
    private auth: AuthServiceProvider,
    private gameController: GameController) {
  }

  public logout() {
    this.auth.logout()
    .then(
      res => this.navCtrl.setRoot(LoginPage)
    )
  }

  public createQuickGame(){
    this.gameController.initNewQuickGame();
    this.navCtrl.push(AboutPage);
  }

}
