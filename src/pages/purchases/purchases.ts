import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';
import { EditProductPage } from '../edit-product/edit-product'
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases.html'
})
export class PurchasesPage {
  userId: any;

  // public products: AfoListObservable<any[]>;
  filteredPurchases: AfoListObservable<any[]>;
  constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth,
  public actionSheetCtrl: ActionSheetController) {
      afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    // this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

    this.filteredPurchases = this.afoDatabase.list(`/userProfile/${this.userId}/products`, {
      query: {
        orderByChild: 'type',
        equalTo: 'purchase'
      }
    });

  });
  }

}
