import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StockPage } from '../pages/stock/stock';
import { ReportsPage } from '../pages/reports/reports';
import { GoodsReturnedPage } from '../pages/goods-returned/goods-returned';
import { SalesPage } from '../pages/sales/sales';
import { PurchasesPage } from '../pages/purchases/purchases';
import { SuppliersPage } from '../pages/suppliers/suppliers';
import { HelpPage } from '../pages/help/help';


import { LoginPage } from '../pages/login/login';

import { AngularFireAuth } from 'angularfire2/auth';

import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
      afAuth: AngularFireAuth, private fcm: FCM) {
        afAuth.authState.subscribe( user => {
            if (user){
              this.rootPage = HomePage;
            } else {
              this.rootPage = LoginPage;
            }
          });
        platform.ready().then(() => {
          this.fcm.subscribeToTopic('all');
this.fcm.getToken().then(token => {
  // backend.registerToken(token);
});
this.fcm.onNotification().subscribe(data => {
  alert('message received')
  if(data.wasTapped) {
   console.info("Received in background");
  } else {
   console.info("Received in foreground");
  };
});
this.fcm.onTokenRefresh().subscribe(token => {
  // backend.registerToken(token);
});
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
        });
      }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }goToStock(params){
    if (!params) params = {};
    this.navCtrl.setRoot(StockPage);
  }goToReports(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ReportsPage);
  }goToGoodsReturned(params){
    if (!params) params = {};
    this.navCtrl.setRoot(GoodsReturnedPage);
  }goToSales(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SalesPage);
  }goToPurchases(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PurchasesPage);
  }goToSuppliers(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SuppliersPage);
  }goToHelp(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HelpPage);
  }
}
