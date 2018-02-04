import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseSearchPage } from './purchase-search';

@NgModule({
  declarations: [
    PurchaseSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseSearchPage),
  ],
  exports: [
    PurchaseSearchPage
  ]
})
export class PurchaseSearchPageModule {}
