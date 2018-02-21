import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UprofilePage } from './uprofile';

@NgModule({
  declarations: [
    UprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(UprofilePage),
  ],
  exports: [
    UprofilePage
  ]
})
export class UprofilePageModule {}
