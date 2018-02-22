import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CalcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-calc',
  templateUrl: 'calc.html',
})
export class CalcPage {
  result = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalcPage');
  }

  btnClicked(btn) {
          if (btn == 'C') {
              this.result = '';
          }
          else if (btn == '=') {
              if (this.result == '') {
                  return;
              }

              try {
                  this.result = eval(this.result).toFixed(2);
              } catch (error) {
                  this.showAlert();
                  this.result = '';
              }
          }
          else {
              this.result += btn;
          }
      }

      showAlert() {
          this.alertCtrl.create({
              title: 'Malformed input',
              subTitle: 'Ooops, please try again...',
              buttons: ['Dismiss']
          }).present();
      }

}
