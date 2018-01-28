import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
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

    public suppliers: AfoListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afoDatabase: AngularFireOfflineDatabase,public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe( user => {
  if (user) { this.userId = user.uid }
  this.suppliers = afoDatabase.list('/suppliers');
});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseSuppliersPage');
  }

}
