import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
       public afAuth: AngularFireAuth, public navCtrl: NavController) {
         afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);
    });
    }

register(){
  this.navCtrl.push(RegisterSupplierPage)
}

}
