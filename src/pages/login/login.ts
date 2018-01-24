import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage} from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    loadingController:LoadingController,
  public angularFireAuth: AngularFireAuth,
private alertCtrl: AlertController) {
  }


  login(username, password) {

    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
      .then((user) => {
        if(user.emailVerified) {

          // Redirect the user here
          this.navCtrl.push(HomePage);
          console.log('Welcome!');

        } else {
          // Tell the user to have a look at its mailbox
          this.navCtrl.push(SignupPage)
          console.log('error');
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
