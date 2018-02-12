import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the BrowseSuppliersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-browse-suppliers',
  templateUrl: 'browse-suppliers.html',
})
export class BrowseSuppliersPage {
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
  sale: '',
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
  });
  }
  addSale(id,saledate,name,salequantity,unit,bprice,sprice,sale,profit,saletotal) {
    if(id) {
      this.purchases.update(id, {
        saledate: saledate,
        name: name,
        salequantity: salequantity,
        unit: unit,
        bprice: bprice,
        sprice: sprice,
        sale: true,
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
      sale: true,
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
