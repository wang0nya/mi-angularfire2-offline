import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html'
})
export class EditProductPage {
  userId: any;
  public products: AfoListObservable<any[]>;
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController) {
       afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);
  });
  }
  updateProduct(product) {
    this.products.update(product.$key, {
      date: product.date,
      type: product.type,
      name: product.name,
      quantity: product.quantity,
      unit: product.unit,
      price: product.price,
      supplier: product.supplier
    });
  }
}
