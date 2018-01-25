import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-add-stock',
  templateUrl: 'add-stock.html'
})
export class AddStockPage {
userId: any;
public products: AfoListObservable<any[]>;
public suppliers: AfoListObservable<any[]>;

product={id:'',
date: '',
type: '',
name: '',
quantity: '',
unit: '',
price: '',
supplier: '',
greturn: '',
grn: '',
gr: ''};
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth, public navCtrl: NavController,
   public params: NavParams) {
       afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);
    this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);

    this.product.id = this.params.get('key');
    this.product.date = this.params.get('date');
    this.product.type = this.params.get('type');
    this.product.name = this.params.get('name');
    this.product.quantity = this.params.get('quantity');
    this.product.unit = this.params.get('unit');
    this.product.price = this.params.get('price');
    this.product.supplier = this.params.get('supplier');
    this.product.greturn = this.params.get('greturn');
    this.product.grn = this.params.get('grn');
    this.product.gr = this.params.get('gr');

  });
  }

addProduct(id,date,type,name,quantity,unit,price,supplier,greturn,grn,gr) {
  if(id) {
    this.products.update(id, {
      date: date,
      type: type,
      name: name,
      quantity: quantity,
      unit: unit,
      price: price,
      supplier: supplier,
      greturn: greturn,
      grn: grn,
      gr: gr,

    }).then( newProduct => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });
  } else {
  this.products.push({
    date: date,
    type: type,
    name: name,
    quantity: quantity,
    unit: unit,
    price: price,
    supplier: supplier,
    greturn: '0',
    grn: '0',
    gr: 'false',

      }).then( newProduct => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    }
  }
}
