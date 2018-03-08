import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { EditProductPage } from '../edit-product/edit-product';
import { BrowseSuppliersPage } from '../browse-suppliers/browse-suppliers';
import { PurchaseSearchPage } from '../purchase-search/purchase-search';
import { AddQPage } from '../add-q/add-q';

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
  search(){
    this.navCtrl.push(PurchaseSearchPage);
  }
  editProduct(purchase){
    console.log(purchase);
    this.navCtrl.push(EditProductPage, {
      key: purchase.$key,
      _date: purchase._date,
      name: purchase.name,
      quantity: purchase.quantity,
      unit: purchase.unit,
      bprice: purchase.bprice,
      sprice: purchase.sprice,
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
showOptions(purchase) {
  let actionSheet = this.actionSheetCtrl.create({
    title: purchase.name,
    buttons: [
      {
        text: 'Add Stock',
        handler: () => {
            this.navCtrl.push(AddQPage, {
              key: purchase.$key,
              _date: purchase._date,
              type: purchase.type,
              name: purchase.name,
              quantity: purchase.quantity,
              unit: purchase.unit,
              bprice: purchase.bprice,
              sprice: purchase.sprice,
              supplier: purchase.supplier
              // greturn: '0',
              // grn: '0',
              // gr: 'false',
            });
          }
        },{
        text: 'Sell',
        handler: () => {
          this.navCtrl.push(BrowseSuppliersPage, {
            key: purchase.$key,
            _date: purchase._date,
            name: purchase.name,
            quantity: purchase.quantity,
            unit: purchase.unit,
            bprice: purchase.bprice,
            sprice: purchase.sprice,
            supplier: purchase.supplier,
            actualq: purchase.actualq
          });
        }
      },{
        text: 'Edit',
        handler: () => {
          this.navCtrl.push(EditProductPage, {
            key: purchase.$key,
            _date: purchase._date,
            name: purchase.name,
            quantity: purchase.quantity,
            unit: purchase.unit,
            bprice: purchase.bprice,
            sprice: purchase.sprice,
            supplier: purchase.supplier,
            greturn: 0,
            grn: 0,
            purchasereturndate: '',
            gr: false,
          });
        }
      },{
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          this.presentConfirm(purchase.$key)
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}
addPurchase(){
  this.navCtrl.push(EditProductPage);
}
}
