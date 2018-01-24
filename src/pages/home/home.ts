import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userId: any;

  public items: AfoListObservable<any[]>;
  constructor(afoDatabase: AngularFireOfflineDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth) {
      afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.items = afoDatabase.list(`/userProfile/${this.userId}/items`);
  });
  }

  addSong(): void {
  const prompt = this.alertCtrl.create({
    title: 'Add Song',
    message: "Add a new song to your playlist",
    inputs: [
      {
        name: 'songName',
        placeholder: 'Song Name'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.items.push({
            songName: data.songName
          });
        }
      }
    ]
  });
  prompt.present();
}
}
