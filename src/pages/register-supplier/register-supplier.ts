import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-register-supplier',
  templateUrl: 'register-supplier.html'
})
export class RegisterSupplierPage {
  userId: any;
  public suppliers: AfoListObservable<any[]>;
    constructor(private afoDatabase: AngularFireOfflineDatabase,
       public afAuth: AngularFireAuth, public navCtrl: NavController) {
         afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);
    });
    }
  addSupplier(name, address, phone, email) {
    // const newSupplierRef = this.suppliers.push({});
    this.suppliers.push({
      // id: newSupplierRef.key,
      name: name,
      address: address,
      phone: phone,
      email: email

        }).then( newSupplier => {
          this.navCtrl.pop();
        }, error => {
          console.log(error);
        });
      }

}
