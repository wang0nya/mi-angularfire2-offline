import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';
import { ReportsPage } from '../reports/reports'
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html'
})
export class StockPage {
  userId: any;
  public productList:Array<any>;
  public loadedProductList:Array<any>;
  public productRef:firebase.database.Reference;
    public products: AfoListObservable<any[]>;
    constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
      public alertCtrl: AlertController, public afAuth: AngularFireAuth,
    public actionSheetCtrl: ActionSheetController) {
        afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

      // searchbar
      this.productRef = firebase.database().ref(`/userProfile/${this.userId}/products`);

      this.productRef.on('value', productList => {
        let products = [];
        productList.forEach( product => {
          products.push(product.val());
          return false;
        });

        this.productList = products;
        this.loadedProductList = products;
      });
      // searchbar end
    });
    }
    initializeItems(){
      this.productList = this.loadedProductList;
    }
    getItems(searchbar) {
      // Reset items back to all of the items
      this.initializeItems();

      // set q to the value of the searchbar
      var q = searchbar.srcElement.value;


      // if the value is an empty string don't filter the items
      if (!q) {
        return;
      }

      this.productList = this.productList.filter((v) => {
        if(v.date && q) {
          if (v.date.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });

      console.log(q, this.productList.length);

    }
    addProductPage() {
    this.navCtrl.push(AddStockPage);
  }

  filter(){
    this.navCtrl.push(ReportsPage);
  }

  editProduct(product){
    console.log(product);
    this.navCtrl.push(AddStockPage, {
      key: product.$key,
      date: product.date,
      type: product.type,
      name: product.name,
      // quantity: product.quantity,
      unit: product.unit,
      price: product.price,
      supplier: product.supplier
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

            this.products.remove(key);

          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}
}
