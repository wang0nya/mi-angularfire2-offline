import { Component } from '@angular/core';
import { NavController, Alert, AlertController, MenuController } from 'ionic-angular';
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
private toast: Toast, public formBuilder: FormBuilder,
private alertCtrl: AlertController,private menu : MenuController) {
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
    .catch(error => {
        const alert: Alert = this.alertCtrl.create({ message: error.message,
        buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      });
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
  ionViewDidEnter() {
// the root left menu should be disabled on this page
this.menu.enable(false);
}

ionViewWillLeave() {
// enable the root left menu when leaving this page
this.menu.enable(true);
}
}
