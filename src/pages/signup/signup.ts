import { Component } from '@angular/core';
import { NavController, IonicPageModule } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController,
  public angularFireAuth: AngularFireAuth,
private toast: Toast) {
  }
  register(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      this.sendEmailVerification()
    })
    // .catch(e => {
    //         console.log(e);
    //         this.toast.show(e, '5000', 'center').subscribe(
    //           toast => {
    //             console.log(toast);
    //           }
    //         );
    //       });
  }
  sendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          this.navCtrl.push(LoginPage);

          console.log('email sent');
          this.toast.show(`Success! Please Check your email for the verification link.`, '5000', 'center').subscribe(
            toast => {
            console.log(toast);
          });
          this.navCtrl.pop();
        })
      });
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }
}
