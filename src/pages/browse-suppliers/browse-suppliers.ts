import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';
  import { FormBuilder, FormGroup} from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
import { Validator } from  '../../validators/validator';

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
  slideOneForm: FormGroup;
  stockInHand: any;
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
  actualq: '',
  sale: '',
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
    this.product.date = this.params.get('date');
    this.product.name = this.params.get('name');
    this.product.quantity = this.params.get('quantity');
    this.product.unit = this.params.get('unit');
    this.product.bprice = this.params.get('bprice');
    this.product.sprice = this.params.get('sprice');
    this.product.actualq = this.params.get('actualq');

    //find stockInHand
    this.afoDatabase.list(`/userProfile/${this.userId}/purchases`).subscribe((purchases) => {
        this.stockInHand = 0;
        purchases.forEach((purchase) => {
            this.stockInHand = purchase.quantity-purchase.salequantity;
        })
    })

    this.slideOneForm = formBuilder.group({
        buyP: ['', Validator.isValid]
    });
  });
  }
  addSale(id,saledate,name,salequantity,unit,bprice,sprice,sale,profit,saletotal) {
    if(id && salequantity<=this.stockInHand) {
      console.log('this.stockInHand');
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
            this.toast.show('Product Sold', '5000', 'center').subscribe(
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
      this.toast.show('You don\'t have enough in stock to make this sale', '5000', 'center').subscribe(
        toast => {
          this.navCtrl.pop();
        }
      );
      }
    }
  }
