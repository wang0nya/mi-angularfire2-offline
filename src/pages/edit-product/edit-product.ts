import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html'
})
export class EditProductPage {
  userId: any;
  public purchases: AfoListObservable<any[]>;
  public suppliers: AfoListObservable<any[]>;
  public products: AfoListObservable<any[]>;
  public sales: AfoListObservable<any[]>;

  purchase={id:'',
  date: '',
  name: '',
  quantity: '',
  unit: '',
  bprice: '',
  sprice: '',
  supplier: '',
  quantitysold: '',
  sale: '',

  greturn: '',
  grn: '',
  gr: '',
  actualquantity: '',
total: ''};
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast) {
       afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.purchases = afoDatabase.list(`/userProfile/${this.userId}/purchases`);
    this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);
    this.sales = afoDatabase.list(`/userProfile/${this.userId}/sales`);

    this.purchase.id = this.params.get('key');
    this.purchase.date = this.params.get('date');
    this.purchase.name = this.params.get('name');
    this.purchase.quantity = this.params.get('quantity');
    this.purchase.unit = this.params.get('unit');
    this.purchase.bprice = this.params.get('bprice');
    this.purchase.sprice = this.params.get('sprice');
    this.purchase.supplier = this.params.get('supplier');
    this.purchase.quantitysold = this.params.get('quantitysold');
    this.purchase.sale = this.params.get('sale');

    this.purchase.greturn = this.params.get('greturn');
    this.purchase.grn = this.params.get('grn');
    this.purchase.gr = this.params.get('gr');
  });
  }
  addPurchase(id,date,name,quantity,unit,bprice,sprice,supplier,quantitysold,sale,greturn,grn,gr,actualquantity,total) {
    if(id) {
      this.purchases.update(id, {
        date: date,
        name: name,
        quantity: quantity,
        unit: unit,
        bprice: bprice,
        sprice: sprice,
        supplier: supplier,
        quantitysold: quantitysold,
        sale: sale,
        greturn: greturn,
        grn: grn,
        gr: gr,
        actualquantity: (quantity-quantitysold),
        total: (actualquantity*bprice),

      }).then( newPurchase => {
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
      unit: unit,
      bprice: bprice,
      sprice: sprice,
      supplier: supplier,
      quantitysold: quantitysold,
      sale: '',
      greturn: '0',
      grn: '0',
      gr: 'false',
      actualquantity: (quantity-quantitysold),
      total: (quantity*bprice),

    }).then( newPurchase => {
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
