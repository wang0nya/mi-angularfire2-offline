import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import {
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as papa from 'papaparse';
import { File } from '@ionic-native/file';
import { Toast } from '@ionic-native/toast';
import { Chart } from 'chart.js';
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
  @ViewChild('barCanvas') barCanvas;

    barChart: any;
userId: any;
stocks: any;
transactions: any;
public stocksRef:firebase.database.Reference;
public transactionsRef:firebase.database.Reference;
headerRow: any;

    constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
      public alertCtrl: AlertController, public afAuth: AngularFireAuth,
    public actionSheetCtrl: ActionSheetController,private file: File
  ,private toast: Toast) {
        afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.stocksRef = firebase.database().ref(`/userProfile/${this.userId}/products`);
      this.transactionsRef = firebase.database().ref(`/userProfile/${this.userId}/purchases`);
      this.stocksRef.on('value', resp => {
          this.stocks = [];
          this.stocks = snapshotToArray(resp);
        });
      this.transactionsRef.on('value', resp => {
          this.transactions = [];
          this.transactions = snapshotToArray(resp);
        });
    });
    }

    private extractData(res) {
      let stocks = res['_body'] || '';
      let transactions = res['_body'] || '';
      let unparsedStocks = papa.unparse(stocks);
      let unparsedTransactions = papa.unparse(transactions);

      this.headerRow = unparsedStocks[0];
      this.headerRow = unparsedTransactions[0];

       // unparsedData.splice(0, 1);
       this.stocks = unparsedStocks;
       this.transactions = unparsedTransactions;
 }

    stocksCSV() {
        let csv = papa.unparse({
          fields: this.headerRow,
          data: this.stocks
        });
        // Dummy implementation for Desktop download purpose
        var blob = new Blob([csv]);
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "report.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        //phone
        this.file.writeFile(this.file.externalRootDirectory, Date.now()+'-stocks-report.csv', blob, { replace: true }).then((entry) => {
        this.toast.show('Stocks Report downloaded', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.pop();
          }
        );
          console.log('download complete');
        }, (error) => {
          // handle error
          this.toast.show('Report download failed', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.pop();
            }
          );
          console.log('download failed');
        });
      }

      transactionsCSV() {
          let csv = papa.unparse({
            fields: this.headerRow,
            data: this.transactions
          });
          // Dummy implementation for Desktop download purpose
          var blob = new Blob([csv]);
          var a = window.document.createElement("a");
          a.href = window.URL.createObjectURL(blob);
          a.download = "report.csv";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          //phone
          this.file.writeFile(this.file.externalRootDirectory, Date.now()+'-transactions-report.csv', blob, { replace: true }).then((entry) => {
          this.toast.show('Transactions Report downloaded', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.pop();
            }
          );
            console.log('download complete');
          }, (error) => {
            // handle error
            this.toast.show('Report download failed', '5000', 'center').subscribe(
              toast => {
                this.navCtrl.pop();
              }
            );
            console.log('download failed');
          });
        }

      trackByFn(index: any, item: any) {
      return index;
    }

    ionViewDidLoad() {
      this.afoDatabase.list(`/userProfile/${this.userId}/purchases`).subscribe((purchases) => {
          purchases.forEach((purchase) => {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {
            labels: [purchase.name],
            datasets: [{
                label: '# of Sales',
                data: [purchase.salequantity],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }

    });
  })
})
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
