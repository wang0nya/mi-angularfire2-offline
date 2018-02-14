import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSPage } from './add-s';

@NgModule({
  declarations: [
    AddSPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSPage),
  ],
  exports: [
    AddSPage
  ]
})
export class AddSPageModule {}
