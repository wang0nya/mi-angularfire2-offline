import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddQPage } from './add-q';

@NgModule({
  declarations: [
    AddQPage,
  ],
  imports: [
    IonicPageModule.forChild(AddQPage),
  ],
  exports: [
    AddQPage
  ]
})
export class AddQPageModule {}
