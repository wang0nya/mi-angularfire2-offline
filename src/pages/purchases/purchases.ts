import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { EditProductPage } from '../edit-product/edit-product';

@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases.html'
})
export class PurchasesPage {
  userId: any;

  public purchases: AfoListObservable<any[]>;
  // filteredPurchases: AfoListObservable<any[]>;
  constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth,
  public actionSheetCtrl: ActionSheetController) {
      afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.purchases = afoDatabase.list(`/userProfile/${this.userId}/purchases`);

    // this.filteredPurchases = this.afoDatabase.list(`/userProfile/${this.userId}/products`, {
    //   query: {
    //     orderByChild: 'type',
    //     equalTo: 'purchase'
    //   }
    // });

  });
  }
  editProduct(purchase){
    console.log(purchase);
    this.navCtrl.push(EditProductPage, {
      key: purchase.$key,
      date: purchase.date,
      type: purchase.type,
      name: purchase.name,
      quantity: purchase.quantity,
      unit: purchase.unit,
      price: purchase.price,
      supplier: purchase.supplier
    });
  }

  presentConfirm(key: string) {
  let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Are you sure?',
    cssClass: 'alertcss',

    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',

        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        cssClass: 'buttoncss',

        handler: () => {

            this.purchases.remove(key);

          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}
addPurchase(){
  this.navCtrl.push(EditProductPage);
}
}
