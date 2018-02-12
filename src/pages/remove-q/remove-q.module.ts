import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemoveQPage } from './remove-q';

@NgModule({
  declarations: [
    RemoveQPage,
  ],
  imports: [
    IonicPageModule.forChild(RemoveQPage),
  ],
  exports: [
    RemoveQPage
  ]
})
export class RemoveQPageModule {}
