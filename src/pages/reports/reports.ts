import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import {
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as papa from 'papaparse';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
userId: any;
sales: any;
public salesRef:firebase.database.Reference;
headerRow: any;

    constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
      public alertCtrl: AlertController, public afAuth: AngularFireAuth,
    public actionSheetCtrl: ActionSheetController) {
        afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.salesRef = firebase.database().ref(`/userProfile/${this.userId}/purchases`);
      this.salesRef.on('value', resp => {
          this.sales = [];
          this.sales = snapshotToArray(resp);
        });
    });
    }
    private extractData(res) {
       let sales = res['_body'] || '';
       let unparsedData = papa.unparse(sales);

       this.headerRow = unparsedData[0];

       // unparsedData.splice(0, 1);
       this.sales = unparsedData;
 }

    downloadCSV() {
        let csv = papa.unparse({
          fields: this.headerRow,
          data: this.sales
        });
        // Dummy implementation for Desktop download purpose
        var blob = new Blob([csv]);
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "report.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      private handleError(err) {
      console.log('something went wrong: ', err);
    }

      trackByFn(index: any, item: any) {
      return index;
    }
}
export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
        console.log(item);

    });

    return returnArr;
};
