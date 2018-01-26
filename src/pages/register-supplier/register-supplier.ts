import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-register-supplier',
  templateUrl: 'register-supplier.html'
})
export class RegisterSupplierPage {
  userId: any;
  public suppliers: AfoListObservable<any[]>;
  supplier={id:'',
  name: '',
  address: '',
  phone: '',
  email: ''};
    constructor(private afoDatabase: AngularFireOfflineDatabase,
       public afAuth: AngularFireAuth, public navCtrl: NavController,
     public params: NavParams,private toast: Toast) {
         afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);

      this.supplier.id = this.params.get('key');
      this.supplier.name = this.params.get('name');
      this.supplier.address = this.params.get('address');
      this.supplier.phone = this.params.get('phone');
      this.supplier.email = this.params.get('email');
    });
    }
  addSupplier(id, name, address, phone, email) {
    // const newSupplierRef = this.suppliers.push({});
    if(id) {
      this.suppliers.update(id, {
        name: name,
        address: address,
        phone: phone,
        email: email,

      }).then( newSupplier => {
        this.toast.show('Supplier updated', '5000', 'center').subscribe(
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
    this.suppliers.push({
      // id: newSupplierRef.key,
      name: name,
      address: address,
      phone: phone,
      email: email,

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
}
