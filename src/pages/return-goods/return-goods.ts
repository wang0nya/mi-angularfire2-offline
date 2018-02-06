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
  public purchases: AfoListObservable<any[]>;

  purchase={id:'',
  date: '',
  name: '',
  quantity: '',
  quantitysold: '',
  unit: '',
  bprice: '',
  sprice: '',
  sale: '',
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
    this.purchases = afoDatabase.list(`/userProfile/${this.userId}/purchases`);

    this.purchase.id = this.params.get('key');
    this.purchase.date = this.params.get('date');
    this.purchase.name = this.params.get('name');
    this.purchase.quantity = this.params.get('quantity');
    this.purchase.quantitysold = this.params.get('quantitysold');
    this.purchase.unit = this.params.get('unit');
    this.purchase.bprice = this.params.get('bprice');
    this.purchase.sprice = this.params.get('sprice');
    this.purchase.sale = this.params.get('sale');
  });
  }
  addSale(id,date,name,quantity,quantitysold,unit,bprice,sprice,sale,total) {
    if(id) {
      this.purchases.update(id, {
        date: date,
        name: name,
        quantity: quantity,
        quantitysold: quantitysold,
        unit: unit,
        bprice: bprice,
        sprice: sprice,
        sale: sale,
        actualquantity: (quantity-quantitysold),

        total: (quantitysold*sprice),

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
      date: date,
      name: name,
      quantity: quantity,
      quantitysold: quantitysold,
      unit: unit,
      bprice: bprice,
      sprice: sprice,
      sale: sale,
      actualquantity: (quantity-quantitysold),

      total: (quantitysold*sprice),

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
