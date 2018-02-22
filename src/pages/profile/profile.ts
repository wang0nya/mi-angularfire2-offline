import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {
  AfoListObservable,AfoObjectObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
import { UprofilePage } from '../uprofile/uprofile';
import firebase from 'firebase';

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
  storageRef: any;
  imageRef: any;
  imgsource: any;
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast, public zone: NgZone, public loadingCtrl: LoadingController) {
   afAuth.authState.subscribe( user => {
if (user) { this.userId = user.uid }
this.profile = afoDatabase.list(`/userProfile/${this.userId}/profile`);
this.mail = afoDatabase.object(`/userProfile/${this.userId}`);
this.storageRef = firebase.storage().ref();
this.imageRef = this.storageRef.child(`${this.userId}/pp.jpg`);
});
  }

  ionViewDidLoad() {
    this.display();
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });
    loader.present();  }
  edit(details){
    this.navCtrl.push(UprofilePage);
  }
 //  public getVenueImage(image: string){
 //     let imgUrl: string;
 //     try{
 //       this.imageRef.getDownloadURL().then(function(url){
 //         console.log("log1: " + url);
 //         return url;
 //       });
 //     }
 //     catch(e){
 //       console.log(e);
 //     }
 // }
 display() {
  this.imageRef.getDownloadURL().then((url) => {
    this.zone.run(() => {
      this.imgsource = url;
     })
  })
}
logoutUser(): Promise<void> {
  return this.afAuth.auth.signOut();
}
  }
