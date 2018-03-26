import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StockPage } from '../stock/stock';
import { ReportsPage } from '../reports/reports';
import { GoodsReturnedPage } from '../goods-returned/goods-returned';
import { SalesPage } from '../sales/sales';
import { PurchasesPage } from '../purchases/purchases';
import { SuppliersPage } from '../suppliers/suppliers';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  goToStock(params){
    if (!params) params = {};
    this.navCtrl.push(StockPage);
  }
  goToReports(params){
    if (!params) params = {};
    this.navCtrl.push(ReportsPage);
  }
  goToGoodsReturned(params){
    if (!params) params = {};
    this.navCtrl.push(GoodsReturnedPage);
  }
  goToSales(params){
    if (!params) params = {};
    this.navCtrl.push(SalesPage);
  }
  goToPurchases(params){
    if (!params) params = {};
    this.navCtrl.push(PurchasesPage);
  }
  goToSuppliers(params){
    if (!params) params = {};
    this.navCtrl.push(SuppliersPage);
  }
  profileD(){
    this.navCtrl.push(ProfilePage);
  }

}
