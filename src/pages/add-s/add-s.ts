import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';
  import { FormBuilder, FormGroup} from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
import { Validator } from  '../../validators/validator';

/**
 * Generated class for the AddSPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-s',
  templateUrl: 'add-s.html',
})
export class AddSPage {
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
  adds: '',
  sale: '',
  profit:'',
  saletotal: ''
};
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public  navCtrl: NavController,
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
        this.product.adds = this.params.get('adds');
        this.product.profit = this.params.get('profit');
        this.product.saletotal = this.params.get('saletotal');

        this.slideOneForm = formBuilder.group({
            buyP: ['', Validator.isValid]
        });
    });
  }
  addSale(id,saledate,name,salequantity,unit,bprice,sprice,adds,sale,profit,saletotal) {
    if(id) {
      this.purchases.update(id, {
        saledate: saledate,
        name: name,
        salequantity: salequantity-(-adds),
        unit: unit,
        bprice: bprice,
        sprice: sprice,
        adds: adds,
        sale: true,
        profit: (sprice-bprice)*(salequantity-(-adds)),
        saletotal: ((salequantity-(-adds))*sprice),

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
      }
    }
  }
