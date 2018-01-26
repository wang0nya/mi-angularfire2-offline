import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterSupplierPage} from '../register-supplier/register-supplier'
@Component({
  selector: 'page-suppliers',
  templateUrl: 'suppliers.html'
})
export class SuppliersPage {
  userId: any;
  public suppliers: AfoListObservable<any[]>;

    constructor(private afoDatabase: AngularFireOfflineDatabase,
       public afAuth: AngularFireAuth, public navCtrl: NavController,
     public alertCtrl: AlertController) {
         afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);

    });
    }

register(){
  this.navCtrl.push(RegisterSupplierPage)
}
editSupplier(supplier){
  console.log(supplier);
  this.navCtrl.push(RegisterSupplierPage, {
    key: supplier.$key,
    name: supplier.name,
    address: supplier.address,
    phone: supplier.phone,
    email: supplier.email

  });
}
presentConfirm(key: string) {
let alert = this.alertCtrl.create({
  title: 'Confirm delete',
  message: 'Are you sure?',
  cssClass: 'alertcss',

  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',

      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Delete',
      cssClass: 'buttoncss',

      handler: () => {

          this.suppliers.remove(key);

        console.log('Buy clicked');
      }
    }
  ]
});
alert.present();
}
}
