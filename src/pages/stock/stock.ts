import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';
import { ReportsPage } from '../reports/reports'
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';

import { EditProductPage } from '../edit-product/edit-product';

import { StockSearchPage } from '../stock-search/stock-search';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage {
  userId: any;

    public products: AfoListObservable<any[]>;
    constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
      public alertCtrl: AlertController, public afAuth: AngularFireAuth,
    public actionSheetCtrl: ActionSheetController) {
        afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);
    });
}
    addProductPage() {
    this.navCtrl.push(AddStockPage);
  }

  search(){
    this.navCtrl.push(StockSearchPage);
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

            this.products.remove(key);

          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}
showOptions(product) {
  let actionSheet = this.actionSheetCtrl.create({
    title: product.name,
    buttons: [
      {
        text: 'Buy',
        handler: () => {
            this.navCtrl.push(EditProductPage, {
              // key: product.$key,
              date: product.date,
              type: product.type,
              name: product.name,
              quantity: product.quantity,
              unit: product.unit,
              price: product.price,
              supplier: product.supplier
            });
          }
        },{
        text: 'Edit',
        handler: () => {
          this.navCtrl.push(AddStockPage, {
            key: product.$key,
            date: product.date,
            type: product.type,
            name: product.name,
            unit: product.unit,
            price: product.price,
            supplier: product.supplier
          });
        }
      },{
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          this.presentConfirm(product.$key);
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
removeProduct(productId) {
  this.products.remove(productId);
}
}
