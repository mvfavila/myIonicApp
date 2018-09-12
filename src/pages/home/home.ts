import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username = '';
  email = '';

  constructor(public navCtrl: NavController,
    private auth: AuthServiceProvider) {
    let info = this.auth.getUserInfo();
    this.username = info['_nickName'];
    this.email = info['_email'];
  }

  public logout() {
    this.auth.logout()
    .then(
      res => this.navCtrl.setRoot(LoginPage)
    )
  }

}
