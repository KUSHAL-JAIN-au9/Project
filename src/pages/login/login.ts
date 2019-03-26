import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  // ToastController,
  // ViewController,
  App,
  LoadingController
} from "ionic-angular";
import { Storage } from '@ionic/storage';
import { UserProvider } from "../../providers/user/user";

import { Toast } from '@ionic-native/toast';



@IonicPage({
  name: "login-page"
})
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  // private username: string = "";
  // private email: string = "";
  // private password: string = "";
  // private error: string;
  loader: any;
  private user = {
    'emailId': '',
    'username': '',
    'profileUrl': ''
  };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    // private toastCtrl: ToastController,
    // private viewCtrl: ViewController,
    private app: App,
    private userProvider: UserProvider,
    private loadingCtrl: LoadingController,
    private toast: Toast

  ) { }

  ionViewDidLoad() {
  }

  googleLogin() {



    // let userInfo: any = {}
    // userInfo.emailId = this.email;
    // userInfo.username = this.username;
    // userInfo.profileUrl = "";
    // this.userProvider.saveUserDatail(userInfo);
    // this.storage.get( 'Securitypin' ).then( ( val ) => {
    //  if(val && val.length>0){
    //   this.app.getRootNav().setRoot("PatternLockPage");
    //  }else{
    //   this.app.getRootNav().setRoot("PatternLockConfirmPage");
    //  }
    // } );


    this.presentLoader();
    this.userProvider.googleLogin().then(data => {
      this.loader.dismiss();
      this.notifyMessage("Logged In")
      this.storage.get('Securitypin').then((val) => {
        if (val && val.length > 0) {
          this.app.getRootNav().setRoot("PatternLockPage");
        } else {
          this.app.getRootNav().setRoot("PatternLockConfirmPage");
        }
      }).catch(error => {
        console.error('error = ', error);
      });
    }).catch(err => {
      this.loader.dismiss();
      this.notifyMessage("Please try again..!")
    });

    // if (this.username.trim().length <= 0 || this.password.trim().length <= 0) {
    //   let toast = this.toastCtrl.create({
    //     message: "Please provide the proper user name and password.",
    //     duration: 3000,
    //     position: "bottom"
    //   });

    //   toast.present();
    //   return;
    // }

    // this.storage
    //   .set("user", {
    //     name: this.username.trim(),
    //     password: this.password.trim()
    //   })
    //   .then(_ => {
    //     // this.viewCtrl.dismiss().then(() => {
    //       this.app.getRootNav().setRoot("FpAuthPage");
    //     // });
    //   })
    //   .catch();
  }

  loginUsingEmail() {
    this.presentLoader();
    console.log('user = ', this.user);
    this.userProvider.login(this.user).then(data => {
      this.loader.dismiss();
      this.notifyMessage("Logged In")
      console.log('pattern locak page');
      this.storage.get('Securitypin').then((val) => {
        if (val && val.length > 0) {
          this.app.getRootNav().setRoot("PatternLockPage");
        } else {
          console.log('patternLockConfirm');
          this.app.getRootNav().setRoot("PatternLockConfirmPage");
        }
      }).catch(err => {
        console.error('error = ', err);
      });
    }).catch(err => {
      if (err = 'cordova_not_available') {
        this.app.getRootNav().setRoot("HomePage");
      }
      this.loader.dismiss();
      this.notifyMessage("Please try again..!")
    });
  }

  facebookLogin() {
    this.presentLoader();
    this.userProvider.facebookLogin().then(data => {
      this.loader.dismiss();
      this.notifyMessage("Logged In")
      this.storage.get('Securitypin').then((val) => {
        if (val && val.length > 0) {
          this.app.getRootNav().setRoot("PatternLockPage");
        } else {
          this.app.getRootNav().setRoot("PatternLockConfirmPage");
        }
      }).catch(err => {
        console.error('error = ', err);
      });
    }).catch(err => {
      this.loader.dismiss();
      this.notifyMessage("Please try again..!")
    });
  }

  notifyMessage(message) {
    this.toast.show(message, '2000', 'bottom').subscribe(
      toast => {
      });
  }

  presentLoader() {
    this.loader = this.loadingCtrl.create({
      spinner: 'bubbles',
    });
    this.loader.present();
  }

  gotoAuthg() { }
}
