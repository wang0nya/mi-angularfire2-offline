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
  public rsuppliers: AfoListObservable<any[]>;
    public suppliers: AfoListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afoDatabase: AngularFireOfflineDatabase,public afAuth: AngularFireAuth,
private toast: Toast) {
    afAuth.authState.subscribe( user => {
  if (user) { this.userId = user.uid }
  this.suppliers = afoDatabase.list('/suppliers');
  this.rsuppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);

});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseSuppliersPage');
  }
  register(name){
    this.rsuppliers.push({
      // id: newSupplierRef.key,
      name: name,
      // address: address,
      // phone: phone,
      // email: email,

        }).then( newSupplier => {
          this.toast.show('Supplier registered', '5000', 'center').subscribe(
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
