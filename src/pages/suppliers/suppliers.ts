import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterSupplierPage} from '../register-supplier/register-supplier'

// email
import { EmailComposer } from '@ionic-native/email-composer';

// Phone
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-suppliers',
  templateUrl: 'suppliers.html'
})
export class SuppliersPage {
  userId: any;
  public suppliers: AfoListObservable<any[]>;

    constructor(private afoDatabase: AngularFireOfflineDatabase,
       public afAuth: AngularFireAuth, public navCtrl: NavController,
     public alertCtrl: AlertController,private emailComposer: EmailComposer,
   private callNumber: CallNumber) {
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
// browse(){
//   this.navCtrl.push(CategoryPage)
// }

// email
send(supplier){
let email = {
  to: supplier.email,
  // cc: 'erika@mustermann.de',
  // bcc: ['john@doe.com', 'jane@doe.com'],
  // attachments: [
  //   'file://img/logo.png',
  //   'res://icon.png',
  //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
  //   'file://README.pdf'
  // ],
  subject: 'Supply Request',
  body: 'How are you? Kindly requesting the following goods:',
  isHtml: true
};
this.emailComposer.open(email);
  }

  // Phone
  launchDialer(supplier){
        this.callNumber.callNumber(supplier.phone, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
}
}
