import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';
import { EditProductPage } from '../edit-product/edit-product'
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
  userId: any;
  public sales: AfoListObservable<any[]>;
  public productList:Array<any>;
  public loadedProductList:Array<any>;
  public productRef:firebase.database.Reference;

    constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
      public alertCtrl: AlertController, public afAuth: AngularFireAuth,
    public actionSheetCtrl: ActionSheetController) {
        afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.sales = afoDatabase.list(`/userProfile/${this.userId}/sales`);

      // searchbar
      this.productRef = firebase.database().ref(`/userProfile/${this.userId}/sales`);

      this.productRef.orderByChild("gr").equalTo("true").on('value', productList => {
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
        if(v.grn && q) {
          if (v.grn.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });

      console.log(q, this.productList.length);

    }
    removeProduct(key: string) {
      this.sales.remove(key);
    }
}
