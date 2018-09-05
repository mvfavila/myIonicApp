import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddChipsModalPage } from './add-chips-modal';

@NgModule({
  declarations: [
    AddChipsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddChipsModalPage),
  ],
})
export class AddChipsModalPageModule {}
