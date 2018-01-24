import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToResetPassword(params){
    if (!params) params = {};
    this.navCtrl.push(ResetPasswordPage);
  }goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
}
