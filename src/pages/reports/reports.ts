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
date: any;
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
        if(v.name && q) {
          if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });

      console.log(q, this.productList.length);

    }
}
