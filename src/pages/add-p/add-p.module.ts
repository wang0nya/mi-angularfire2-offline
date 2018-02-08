import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPPage } from './add-p';

@NgModule({
  declarations: [
    AddPPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPPage),
  ],
  exports: [
    AddPPage
  ]
})
export class AddPPageModule {}
