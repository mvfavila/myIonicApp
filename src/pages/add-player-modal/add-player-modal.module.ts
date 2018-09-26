import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlayerModalPage } from './add-player-modal';

@NgModule({
  declarations: [
    AddPlayerModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPlayerModalPage),
  ],
})
export class AddPlayerModalPageModule {}
