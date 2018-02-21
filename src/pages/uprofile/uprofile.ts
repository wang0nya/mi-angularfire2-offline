import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,AfoObjectObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the UprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-uprofile',
  templateUrl: 'uprofile.html',
})
export class UprofilePage {
  userId: any;
  public profile: AfoListObservable<any[]>;
  public mail: AfoObjectObservable<any[]>;
  details={id:'',
  name: '',
  business: '',
  address: '',
  area:''};
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast) {
   afAuth.authState.subscribe( user => {
if (user) { this.userId = user.uid }
this.profile = afoDatabase.list(`/userProfile/${this.userId}/profile`);
this.mail = afoDatabase.object(`/userProfile/${this.userId}`);

this.details.id = this.params.get('key');
this.details.name = this.params.get('name');
this.details.business = this.params.get('business');
this.details.address = this.params.get('address');
this.details.area = this.params.get('area');


});
  }
  addProfile(id,name,business,
  address,area){
    this.profile.update(id,{
      name: name,
      business: business,
      address: address,
      area: area,
    }).then( newProduct => {
          this.toast.show('Profile details added', '5000', 'center').subscribe(
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
