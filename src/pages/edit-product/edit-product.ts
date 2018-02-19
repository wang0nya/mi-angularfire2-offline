import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';
  import { FormBuilder, FormGroup} from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
import { Validator } from  '../../validators/validator';

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html'
})
export class EditProductPage {
  slideOneForm: FormGroup;
  userId: any;
  public purchases: AfoListObservable<any[]>;
  public suppliers: AfoListObservable<any[]>;
  public products: AfoListObservable<any[]>;

  purchase={id:'',
  date: '',
  name: '',
  quantity: '',
  unit: '',
  bprice: '',
  sprice: '',
  supplier: '',
  greturn: '',
  grn: '',
  gr: '',
total: ''};
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast
 , public formBuilder: FormBuilder) {
       afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.purchases = afoDatabase.list(`/userProfile/${this.userId}/purchases`);
    this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

    this.purchase.id = this.params.get('key');
    this.purchase.date = this.params.get('date');
    this.purchase.name = this.params.get('name');
    this.purchase.quantity = this.params.get('quantity');
    this.purchase.unit = this.params.get('unit');
    this.purchase.bprice = this.params.get('bprice');
    this.purchase.sprice = this.params.get('sprice');
    this.purchase.supplier = this.params.get('supplier');
    this.purchase.greturn = this.params.get('greturn');
    this.purchase.grn = this.params.get('grn');
    this.purchase.gr = this.params.get('gr');

    this.slideOneForm = formBuilder.group({
        buyP: ['', Validator.isValid]
    });
  });
  }
  addPurchase(id,date,name,quantity,unit,bprice,sprice,supplier,greturn,grn,gr,total) {
    if(id) {
      this.purchases.update(id, {
        date: date,
        name: name,
        quantity: quantity,
        unit: unit,
        bprice: bprice,
        sprice: sprice,
        supplier: supplier,
        greturn: greturn,
        grn: grn,
        gr: gr,
        total: (quantity*bprice),

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
      greturn: '0',
      grn: '0',
      gr: 'false',
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
