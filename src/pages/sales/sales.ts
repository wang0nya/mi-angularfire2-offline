import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { ReturnGoodsPage } from '../return-goods/return-goods';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html'
})
export class SalesPage {
  userId: any;

  public sales: AfoListObservable<any[]>;
  constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth,
  public actionSheetCtrl: ActionSheetController) {
      afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.sales = afoDatabase.list(`/userProfile/${this.userId}/sales`);

  });
  }
  editProduct(sale){
    console.log(sale);
    this.navCtrl.push(ReturnGoodsPage, {
      key: sale.$key,
      date: sale.date,
      name: sale.name,
      quantity: sale.quantity,
      unit: sale.unit,
      price: sale.price
      // supplier: sale.supplier
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

            this.sales.remove(key);

          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}
showOptions(sale) {
  let actionSheet = this.actionSheetCtrl.create({
    title: sale.name,
    buttons: [
      // {
      //   text: 'Buy',
      //   handler: () => {
      //       this.navCtrl.push(EditProductPage, {
      //         key: product.$key,
      //         date: product.date,
      //         type: product.type,
      //         name: product.name,
      //         quantity: product.quantity,
      //         unit: product.unit,
      //         price: product.price,
      //         supplier: product.supplier
      //       });
      //     }
      //   }
      // ,{
      //   text: 'Sell',
      //   handler: () => {
      //     this.navCtrl.push(ReturnGoodsPage, {
      //       key: product.$key,
      //       date: product.date,
      //       name: product.name,
      //       quantity: product.quantity,
      //       unit: product.unit,
      //       price: product.price,
      //       supplier: product.supplier
      //     });
      //   }
      // }
      {
        text: 'Edit',
        handler: () => {
          this.navCtrl.push(ReturnGoodsPage, {
            key: sale.$key,
            date: sale.date,
            name: sale.name,
            quantity: sale.quantity,
            unit: sale.unit,
            price: sale.price
            // supplier: sale.supplier
          });
        }
      },{
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          this.presentConfirm(sale.$key)
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
addSale(){
  this.navCtrl.push(ReturnGoodsPage);
}
}
