import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage} from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { Toast } from '@ionic-native/toast';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
public loading: Loading;
  constructor(public navCtrl: NavController,
  public loadingCtrl: LoadingController,
  public angularFireAuth: AngularFireAuth,
private alertCtrl: AlertController,private toast: Toast) {
  }


  login(username, password) {

    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
      .then((user) => {
        if(user.emailVerified) {

          // Redirect the user here
          this.loading.dismiss().then(() => {
          this.toast.show(`Welcome!`, '5000', 'center').subscribe(
            toast => {
            console.log(toast);
            });
          this.navCtrl.setRoot(HomePage);

          })
        }
      })
      .catch(error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({ message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          alert.present();
          })
        });

      this.loading = this.loadingCtrl.create({
        content: "Logging in...",
        // duration: 3000
      });
      this.loading.present();
  }

  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  goToResetPassword(params){
    if (!params) params = {};
    this.navCtrl.push(ResetPasswordPage);
  }
}
