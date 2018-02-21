import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,AfoObjectObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
import { UprofilePage } from '../uprofile/uprofile';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userId: any;
  public profile: AfoListObservable<any[]>;
  public mail: AfoObjectObservable<any[]>;
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast) {
   afAuth.authState.subscribe( user => {
if (user) { this.userId = user.uid }
this.profile = afoDatabase.list(`/userProfile/${this.userId}/profile`);
this.mail = afoDatabase.object(`/userProfile/${this.userId}`);

});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  edit(details){
    this.navCtrl.push(UprofilePage);
  }
  }
