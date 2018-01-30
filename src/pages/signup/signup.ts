import { Component } from '@angular/core';
import { NavController, IonicPageModule } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Toast } from '@ionic-native/toast';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public addUserForm:FormGroup;

  constructor(public navCtrl: NavController,
  public angularFireAuth: AngularFireAuth,
private toast: Toast, public formBuilder: FormBuilder) {
  this.addUserForm = formBuilder.group({
userEmail: ['', Validators.compose([Validators.required,
  Validators.pattern('[A-Za-z0-9_@.]*'),
Validators.minLength(8)])],
userPass: ['', Validators.compose([Validators.required,
Validators.minLength(8)])],
});
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
