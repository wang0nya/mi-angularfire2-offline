import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    loadingController:LoadingController,
  public angularFireAuth: AngularFireAuth,
private alertCtrl: AlertController,private toast: Toast) {
  }


  login(username, password) {

    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
      .then((user) => {
        if(user.emailVerified) {

          // Redirect the user here
          this.navCtrl.push(HomePage);
          console.log('Welcome!');
          this.toast.show(`Welcome!`, '5000', 'center').subscribe(
            toast => {
            console.log(toast);
          });
        } else {
          // Tell the user to have a look at its mailbox
          .catch(e => {
            console.log(e);
            this.toast.show(e, '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          });
        }
      });

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
