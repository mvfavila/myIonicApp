import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitLoadPage } from './init-load';

@NgModule({
  declarations: [
    InitLoadPage,
  ],
  imports: [
    IonicPageModule.forChild(InitLoadPage),
  ],
})
export class InitLoadPageModule {}
