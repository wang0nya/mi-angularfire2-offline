import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,AfoObjectObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
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
  captureDataUrl: string;
  @Input('useURI') useURI: Boolean = true;
  userId: any;
  public profile: AfoListObservable<any[]>;
  public mail: AfoObjectObservable<any[]>;
  storageRef: any;
  imageRef: any;
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast,private camera: Camera) {
   afAuth.authState.subscribe( user => {
if (user) { this.userId = user.uid }
this.profile = afoDatabase.list(`/userProfile/${this.userId}/profile`);
this.mail = afoDatabase.object(`/userProfile/${this.userId}`);
this.storageRef = firebase.storage().ref();
this.imageRef = this.storageRef.child(`${this.userId}/pp.jpg`);

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
  getPicture(sourceType){
      const cameraOptions: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType
      };

      this.camera.getPicture(cameraOptions)
       .then((captureDataUrl) => {
         this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
      }, (err) => {
          console.log(err);
      });
    }

  upload() {
      this.imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot)=> {
          // Do something here when the data is succesfully uploaded!
          this.toast.show('Photo Uploaded', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.pop();
            }
          );
      });
    }

}
