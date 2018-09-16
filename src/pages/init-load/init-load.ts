import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { UsersService } from '../../user/user-service';
import { AuthenticatedUser } from '../../user/user';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the InitLoadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-init-load',
  templateUrl: 'init-load.html',
})
export class InitLoadPage {

  private loading: Loading;
  private user: AuthenticatedUser;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private userService: UsersService) {
      this.loadFirstPage();
  }

  loadFirstPage() {
    this.showLoading();
    this.userService.getOnStorage().then(
      (user) => {
        this.user = AuthenticatedUser.ParseFromObject(user);

        if (this.user.token == null) {
          this.navCtrl.push(LoginPage)
        }
        else {
          this.navCtrl.push(TabsPage);
        }
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  };

};
