import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GameController } from '../game/gameController';
import { AddChipsModalPage } from '../pages/add-chips-modal/add-chips-modal';
import { PlayerController } from '../player/playerController';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HttpModule } from '@angular/http';
import { UsersService } from '../user/user-service';
import { IonicStorageModule } from "@ionic/storage";
import { InitLoadPage } from '../pages/init-load/init-load';
import { ApiService } from '../api/api-service';
import { GameServiceProvider } from '../game/game-service';
import { GameStorage } from '../game/game-storage';
import { AddPlayerModalPage } from '../pages/add-player-modal/add-player-modal';

/*
// These are all imports required for Pro Client with Monitoring & Deploy,
// feel free to merge into existing imports above.
import { Pro } from '@ionic/pro';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

Pro.init('BDF820C4', {
  appVersion: '0.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}
*/

export function provideStorage() {
  return new Storage();
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddChipsModalPage,
    AddPlayerModalPage,
    LoginPage,
    RegisterPage,
    InitLoadPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddChipsModalPage,
    AddPlayerModalPage,
    LoginPage,
    RegisterPage,
    InitLoadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GameController,
    PlayerController,
    AuthServiceProvider,
	  //IonicErrorHandler,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage},
    UsersService,
    ApiService,
    GameServiceProvider,
    GameStorage
  ]
})
export class AppModule {}
