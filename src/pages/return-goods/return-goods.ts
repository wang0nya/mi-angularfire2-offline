import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
import { Validator } from  '../../validators/validator';

@Component({
  selector: 'page-return-goods',
  templateUrl: 'return-goods.html'
})
export class ReturnGoodsPage {
  slideOneForm: FormGroup;
  userId: any;
  public purchases: AfoListObservable<any[]>;
  public suppliers: AfoListObservable<any[]>;
  public products: AfoListObservable<any[]>;

  product={id:'',
  saledate: '',
  name: '',
  salequantity: '',
  unit: '',
  bprice: '',
  sprice: '',

  // supplier: '',
  salegreturn: '',
  salegrn: '',
  salegr: '',
  profit:'',
  total: ''
};
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast
 , public formBuilder: FormBuilder) {
       afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.purchases = afoDatabase.list(`/userProfile/${this.userId}/purchases`);
    this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

    this.product.id = this.params.get('key');
    this.product.saledate = this.params.get('saledate');
    this.product.name = this.params.get('name');
    this.product.salequantity = this.params.get('salequantity');
    this.product.unit = this.params.get('unit');
    this.product.bprice = this.params.get('bprice');
    this.product.sprice = this.params.get('sprice');
    // this.product.supplier = this.params.get('supplier');
    this.product.salegreturn = this.params.get('salegreturn');
    this.product.salegrn = this.params.get('salegrn');
    this.product.salegr = this.params.get('salegr');

    this.slideOneForm = formBuilder.group({
        buyP: ['', Validator.isValid]
    });
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
