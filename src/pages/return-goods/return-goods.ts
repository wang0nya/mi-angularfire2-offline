import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-return-goods',
  templateUrl: 'return-goods.html'
})
export class ReturnGoodsPage {
  userId: any;
  public sales: AfoListObservable<any[]>;
  public suppliers: AfoListObservable<any[]>;
  public products: AfoListObservable<any[]>;

  product={id:'',
  date: '',
  name: '',
  quantity: '',
  unit: '',
  price: '',
  // supplier: '',
  greturn: '',
  grn: '',
  gr: '',
  total: ''
};
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast) {
       afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.sales = afoDatabase.list(`/userProfile/${this.userId}/sales`);
    this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

    this.product.id = this.params.get('key');
    this.product.date = this.params.get('date');
    this.product.name = this.params.get('name');
    this.product.quantity = this.params.get('quantity');
    this.product.unit = this.params.get('unit');
    this.product.price = this.params.get('price');
    // this.product.supplier = this.params.get('supplier');
    this.product.greturn = this.params.get('greturn');
    this.product.grn = this.params.get('grn');
    this.product.gr = this.params.get('gr');
  });
  }
  addSale(id,date,name,quantity,unit,price,greturn,grn,gr,total) {
    if(id) {
      this.sales.update(id, {
        date: date,
        name: name,
        quantity: quantity,
        unit: unit,
        price: price,
        // supplier: supplier,
        greturn: greturn,
        grn: grn,
        gr: gr,
        total: (quantity*price),

      }).then( newSale => {
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
    this.sales.push({
      date: date,
      name: name,
      quantity: quantity,
      unit: unit,
      price: price,
      // supplier: supplier,
      greturn: '0',
      grn: '0',
      gr: 'false',
      total: (quantity*price),

    }).then( newSale => {
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
