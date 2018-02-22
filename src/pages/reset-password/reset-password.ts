import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Alert, AlertController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public angularFireAuth: AngularFireAuth, private toast: Toast,
private alertCtrl: AlertController,private menu : MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  sendPassword(email) {
this.angularFireAuth.auth.sendPasswordResetEmail(email)
.then(() => {
console.log('email sent');
this.toast.show(`Password reset link will be sent to your email.`, '5000', 'center').subscribe(
  toast => {
  console.log(toast);
})
this.navCtrl.pop();
})
.catch(error => {
    const alert: Alert = this.alertCtrl.create({ message: error.message,
    buttons: [{ text: 'Ok', role: 'cancel' }]
    });
    alert.present();

  });
}
ionViewDidEnter() {
// the root left menu should be disabled on this page
this.menu.enable(false);
}

ionViewWillLeave() {
// enable the root left menu when leaving this page
this.menu.enable(true);
}
}
