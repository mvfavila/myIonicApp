import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, AlertController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { UsersService } from '../../user/user-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { username: '', pass: '' };
  
  constructor(private nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private userService: UsersService) {      
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }
 
  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials.username, this.registerCredentials.pass).then(
      (user) => {
        this.userService.createOnStorage(user);
        this.nav.setRoot(TabsPage);
      }).catch(
        (err) => {
          this.showError("Access Denied");
        }
    );
  }
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
