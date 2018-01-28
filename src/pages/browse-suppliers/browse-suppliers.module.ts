import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseSuppliersPage } from './browse-suppliers';

@NgModule({
  declarations: [
    BrowseSuppliersPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseSuppliersPage),
  ],
  exports: [
    BrowseSuppliersPage
  ]
})
export class BrowseSuppliersPageModule {}
