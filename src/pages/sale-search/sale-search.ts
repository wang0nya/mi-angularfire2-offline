import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';
import * as papa from 'papaparse';
import { File } from '@ionic-native/file';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the SaleSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sale-search',
  templateUrl: 'sale-search.html',
})
export class SaleSearchPage {
  userId: any;
  public productList:any;
  public loadedProductList:Array<any>;
  public productRef:firebase.database.Reference;
    public products: AfoListObservable<any[]>;
    headerRow: any;

    constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
      public afAuth: AngularFireAuth, public loadingCtrl: LoadingController,private file: File
    ,private toast: Toast) {
        afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

      // searchbar
      this.productRef = firebase.database().ref(`/userProfile/${this.userId}/purchases`);
      this.productRef.orderByChild("sale").equalTo(true).on('value', productList => {
              let products = [];
              this.productList = snapshotToArray(productList);

              productList.forEach( product => {
                products.push(product.val());
                return false;
              });

              this.productList = products;
              this.loadedProductList = products;
            });
   // searchbar end
    });
  }
  initializeItems(){
        this.productList = this.loadedProductList;
      }
      getItems(searchbar) {
        // Reset items back to all of the items
        this.initializeItems();

        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;


        // if the value is an empty string don't filter the items
        if (!q) {
          return;
        }

        this.productList = this.productList.filter((v) => {
          if(v._date && q || v.name && q) {
            if (v._date.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
              return true;
            }
            return false;
          }
        });

        console.log(q, this.productList.length);

      }
      ionViewDidLoad() {
        let loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 3000
        });
        loader.present();
      }
      private extractData(res) {
        let productList = res['_body'] || '';
        let unparsedProducts = papa.unparse(productList);

        this.headerRow = unparsedProducts[0];

         // unparsedData.splice(0, 1);
         this.productList = unparsedProducts;
      }
          salesCSV() {
              let csv = papa.unparse({
                fields: this.headerRow,
                data: this.productList
              });
              //phone download
              var blob = new Blob([csv]);
              var a = window.document.createElement("a");
              a.href = window.URL.createObjectURL(blob);
              a.download = "report.csv";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              this.file.writeFile(this.file.externalRootDirectory, Date.now()+'-sales-report.csv', blob, { replace: true }).then((entry) => {
              this.toast.show('Sale Report downloaded', '5000', 'center').subscribe(
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
