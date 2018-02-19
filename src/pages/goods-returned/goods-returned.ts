import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController, LoadingController } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-goods-returned',
  templateUrl: 'goods-returned.html'
})
export class GoodsReturnedPage {
  userId: any;

  public products: AfoListObservable<any[]>;
  public grOutList:Array<any>;
  public grInList:Array<any>;
  public loadedGrOutList:Array<any>;
  public loadedGrInList:Array<any>;
  public grOutRef:firebase.database.Reference;
  public grInRef:firebase.database.Reference;

    constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth,
  public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {
      afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

    // searchbar
    this.grOutRef = firebase.database().ref(`/userProfile/${this.userId}/purchases`);
    this.grInRef = firebase.database().ref(`/userProfile/${this.userId}/purchases`);

    this.grOutRef.orderByChild("gr").equalTo("true").on('value', grOutList => {
      let products = [];
      grOutList.forEach( product => {
        products.push(product.val());
        return false;
      });

      this.grOutList = products;
      this.loadedGrOutList = products;
    });

    this.grInRef.orderByChild("salegr").equalTo("true").on('value', grInList => {
      let products = [];
      grInList.forEach( product => {
        products.push(product.val());
        return false;
      });

      this.grInList = products;
      this.loadedGrInList = products;
    });
    // searchbar end

  });
  }
  initializeItems(){
    this.grOutList = this.loadedGrOutList;
    this.grInList = this.loadedGrInList;
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

    this.grOutList = this.grOutList.filter((v) => {
      if(v.grn && q) {
        if (v.grn.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    this.grInList = this.grInList.filter((v) => {
      if(v.salegrn && q) {
        if (v.salegrn.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.grOutList.length);
    console.log(q, this.grInList.length);

  }
  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
}
