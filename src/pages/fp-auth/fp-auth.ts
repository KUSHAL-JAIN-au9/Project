import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { FingerprintAIO } from "@ionic-native/fingerprint-aio";

/**
 * Generated class for the FpAuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-fp-auth",
  templateUrl: "fp-auth.html"
})
export class FpAuthPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private faio: FingerprintAIO
  ) {}

  ionViewDidLoad() {
    this.unclockApp();
  }

  unclockApp() {
    this.faio
      .show({
        clientId: "eath-user",
        disableBackup: true, //Only for Android(optional)
        localizedReason: "Please authenticate" //Only for iOS
      })
      .then((result: any) => {
        this.navCtrl.push('HomePage')
      })
      .catch((error: any) => {
        this.navCtrl.push( 'HomePage' )
      });
  }
}
