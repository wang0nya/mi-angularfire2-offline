import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleSearchPage } from './sale-search';

@NgModule({
  declarations: [
    SaleSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleSearchPage),
  ],
  exports: [
    SaleSearchPage
  ]
})
export class SaleSearchPageModule {}
