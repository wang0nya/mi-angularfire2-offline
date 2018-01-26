import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-goods-returned',
  templateUrl: 'goods-returned.html'
})
export class GoodsReturnedPage {
  userId: any;

  public products: AfoListObservable<any[]>;
  filteredGRs: AfoListObservable<any[]>;
  constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth,
  public actionSheetCtrl: ActionSheetController) {
      afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

    this.filteredGRs = this.afoDatabase.list(`/userProfile/${this.userId}/products`, {
      query: {
        orderByChild: 'gr',
        equalTo: true
      }
    });

  });
  }
  removeProduct(key: string) {
    this.products.remove(key);
  }
}
