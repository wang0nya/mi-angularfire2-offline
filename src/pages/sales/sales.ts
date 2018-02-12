import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { ReturnGoodsPage } from '../return-goods/return-goods';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { SaleSearchPage } from '../sale-search/sale-search';
import { RemoveQPage } from '../remove-q/remove-q';

@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html'
})
export class SalesPage {
  userId: any;
priceTotal: any;
profitTotal: any;
  public sales: AfoListObservable<any[]>;
  constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth,
  public actionSheetCtrl: ActionSheetController) {
      afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.sales = this.afoDatabase.list(`/userProfile/${this.userId}/purchases`, {
       query: {
         orderByChild: 'sale',
         equalTo: true
       }
   });

//find total sum
this.afoDatabase.list(`/userProfile/${this.userId}/purchases`).subscribe((purchases) => {
    this.priceTotal = 0;
    purchases.forEach((purchase) => {
        this.priceTotal += purchase.saletotal;
    })
})

//find total profit
this.afoDatabase.list(`/userProfile/${this.userId}/purchases`).subscribe((purchases) => {
    this.profitTotal = 0;
    purchases.forEach((purchase) => {
        this.profitTotal += purchase.profit;
    })
})
  });
  }
  search(){
    this.navCtrl.push(SaleSearchPage);
  }
  editProduct(purchase){
    console.log(purchase);
    this.navCtrl.push(ReturnGoodsPage, {
      key: purchase.$key,
      date: purchase.date,
      name: purchase.name,
      quantity: purchase.quantity,
      unit: purchase.unit,
      bprice: purchase.bprice,
      sprice: purchase.sprice
      // supplier: sale.supplier
    });
  }
//   presentConfirm(key: string) {
//   let alert = this.alertCtrl.create({
//     title: 'Confirm delete',
//     message: 'Are you sure?',
//     cssClass: 'alertcss',
//
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Delete',
//         cssClass: 'buttoncss',
//
//         handler: () => {
//
//             this.purchases.remove(key);
//
//           console.log('Buy clicked');
//         }
//       }
//     ]
//   });
//   alert.present();
// }
showOptions(purchase) {
  let actionSheet = this.actionSheetCtrl.create({
    title: purchase.name,
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
            key: purchase.$key,
            date: purchase.date,
            name: purchase.name,
            quantity: purchase.quantity,
            unit: purchase.unit,
            bprice: purchase.bprice,
            sprice: purchase.sprice
            // supplier: purchase.supplier
          });
        }
      },{
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          this.navCtrl.push(RemoveQPage, {
            key: purchase.$key,
            date: purchase.date,
            name: purchase.name,
            quantity: purchase.quantity,
            unit: purchase.unit,
            bprice: purchase.bprice,
            sprice: purchase.sprice,
            salegreturn: '0',
            salegrn: '',
            salegr: '',
            salequantity: '0',
            profit: '0',
            saletotal:'0',
            sale: ''
            // supplier: sale.supplier
          });
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
