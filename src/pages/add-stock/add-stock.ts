import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';

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
name: '',
unit: '',
bprice: '',
sprice: '',
supplier: ''
};
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth, public navCtrl: NavController,
   public params: NavParams,private toast: Toast) {
       afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);
    this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);

    this.product.id = this.params.get('key');
    this.product.date = this.params.get('date');
    this.product.name = this.params.get('name');
    this.product.unit = this.params.get('unit');
    this.product.bprice = this.params.get('bprice');
    this.product.sprice = this.params.get('sprice');
    this.product.supplier = this.params.get('supplier');

  });
  }

addProduct(id,date,name,unit,bprice,sprice,supplier) {
  if(id) {
    this.products.update(id, {
      date: date,
      name: name,
      unit: unit,
      bprice: bprice,
      sprice: sprice,
      supplier: supplier,

    }).then( newProduct => {
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.pop();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });

  } else {
  this.products.push({
    date: date,
    name: name,
    unit: unit,
    bprice: bprice,
    sprice: sprice,
    supplier: supplier,

  }).then( newProduct => {
            this.toast.show('Data saved', '5000', 'center').subscribe(
              toast => {
                this.navCtrl.pop();
              }
            );
          })
          .catch(e => {
            console.log(e);
            this.toast.show(e, '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          });
    }
  }
}
