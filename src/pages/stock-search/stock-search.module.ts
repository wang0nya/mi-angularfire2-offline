import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockSearchPage } from './stock-search';

@NgModule({
  declarations: [
    StockSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(StockSearchPage),
  ],
  exports: [
    StockSearchPage
  ]
})
export class StockSearchPageModule {}
