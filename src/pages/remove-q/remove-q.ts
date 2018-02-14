import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  AlertController,
    ActionSheetController } from 'ionic-angular';
import {
      AfoListObservable,
      AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the RemoveQPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-remove-q',
  templateUrl: 'remove-q.html',
})
export class RemoveQPage {
  userId: any;
  public purchases: AfoListObservable<any[]>;
  product={id:'',
  name: '',
  salegreturn:'',
  salegrn:'',
  salegr:'',
  salequantity: '',
  profit: '',
  saletotal: '',
  sale: ''
};
  constructor(public navCtrl: NavController,
    private afoDatabase: AngularFireOfflineDatabase,
      public alertCtrl: AlertController, public afAuth: AngularFireAuth,
    public actionSheetCtrl: ActionSheetController,public params: NavParams,
  private toast: Toast) {
      afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.purchases = afoDatabase.list(`/userProfile/${this.userId}/purchases`);
    this.product.id = this.params.get('key');
    this.product.name = this.params.get('name');
    this.product.salegreturn = this.params.get('salegreturn');
    this.product.salegrn = this.params.get('salegrn');
    this.product.salegr = this.params.get('salegr');
    this.product.salequantity = this.params.get('salequantity');
    this.product.profit = this.params.get('profit');
    this.product.sale = this.params.get('sale');
  });
  }

  addSale(id,salegreturn,salegrn,salegr,salequantity,profit,saletotal,sale) {
    if(id) {
      this.purchases.update(id, {
        salegreturn: '0',
        salegrn: '',
        salegr: '',
        salequantity: '0',
        profit: '0',
        saletotal: '0',
        sale: '',

      }).then( newSale => {
            this.toast.show('Sale Deleted', '5000', 'center').subscribe(
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
