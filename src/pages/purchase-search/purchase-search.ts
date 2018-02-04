import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase'
/**
 * Generated class for the PurchaseSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-purchase-search',
  templateUrl: 'purchase-search.html',
})
export class PurchaseSearchPage {
  userId: any;
  public productList:Array<any>;
  public loadedProductList:Array<any>;
  public productRef:firebase.database.Reference;
    public products: AfoListObservable<any[]>;
    constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
      public afAuth: AngularFireAuth, public loadingCtrl: LoadingController) {
        afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

      // searchbar
      this.productRef = firebase.database().ref(`/userProfile/${this.userId}/purchases`);
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
          if(v.date && q || v.name && q) {
            if (v.date.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
              return true;
            }
            return false;
          }
        });

        console.log(q, this.productList.length);

      }
      ionViewDidLoad() {
        let loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 3000
        });
        loader.present();
      }

  }
