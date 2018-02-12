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
  public purchases: AfoListObservable<any[]>;
  public suppliers: AfoListObservable<any[]>;
  public products: AfoListObservable<any[]>;

  product={id:'',
  date: '',
  name: '',
  quantity: '',
  unit: '',
  bprice: '',
  sprice: '',

  // supplier: '',
  greturn: '',
  grn: '',
  gr: '',
  profit:'',
  total: ''
};
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast) {
       afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.purchases = afoDatabase.list(`/userProfile/${this.userId}/purchases`);
    this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

    this.product.id = this.params.get('key');
    this.product.date = this.params.get('date');
    this.product.name = this.params.get('name');
    this.product.quantity = this.params.get('quantity');
    this.product.unit = this.params.get('unit');
    this.product.bprice = this.params.get('bprice');
    this.product.sprice = this.params.get('sprice');
    // this.product.supplier = this.params.get('supplier');
    this.product.greturn = this.params.get('greturn');
    this.product.grn = this.params.get('grn');
    this.product.gr = this.params.get('gr');
  });
  }
  addSale(id,saledate,name,salequantity,unit,bprice,sprice,salegreturn,salegrn,salegr,profit,saletotal) {
    if(id) {
      this.purchases.update(id, {
        saledate: saledate,
        name: name,
        salequantity: salequantity,
        unit: unit,
        bprice: bprice,
        sprice: sprice,

        // supplier: supplier,
        salegreturn: salegreturn,
        salegrn: salegrn,
        salegr: salegr,
        profit: (sprice-bprice)*salequantity,
        saletotal: (salequantity*sprice),

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
      this.purchases.push({
      saledate: saledate,
      name: name,
      salequantity: salequantity,
      unit: unit,
      bprice: bprice,
      sprice: sprice,

      // supplier: supplier,
      salegreturn: '0',
      salegrn: '0',
      salegr: 'false',
      profit: (sprice-bprice)*salequantity,
      saletotal: (salequantity*sprice),

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
