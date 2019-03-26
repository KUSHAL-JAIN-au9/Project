import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-pattern-lock-confirm',
  templateUrl: 'pattern-lock-confirm.html',
})
export class PatternLockConfirmPage {

  passcode: any;
  pageStatus: any;
  codeone: any;
  codetwo: any;
  codethree: any;
  codefour: any;
  int: any;
  newPincount: any;
  message: any;
  finalPin: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    public storage: Storage) {
    this.passcode = '';
    this.finalPin = '';
    this.message = true;
    this.pageStatus = "Confirm Pin"
    this.int = 0;
    this.newPincount = 0;
  }

  ionViewDidLoad() {
  }


  add(value) {
    // this.storage.get('Securitypin').then((Securitypin) => {

    if (this.passcode.length < 4) {
      this.passcode = this.passcode + value;
      if (this.int == 0) {
        this.codeone = value;
        this.int++
      } else if (this.int == 1) {
        this.codetwo = value;
        this.int++
      } else if (this.int == 2) {
        this.codethree = value;
        this.int++
      } else if (this.int == 3) {
        this.codefour = value;
        this.int++
      }
      // if (this.passcode.length == 4) {
      //   if (this.newPincount > 0) {
      //     if (this.finalPin == this.codeone + this.codetwo + this.codethree + this.codefour) {
      //       this.navCtrl.push('HomePage')
      //       this.message = true;
      //     } else {
      //       this.message = false;
      //     }
      //   } else {
      //     this.pageStatus = "Confirm Pin"
      //     this.newPincount++
      //     this.finalPin = this.codeone + this.codetwo + this.codethree + this.codefour
      //     this.codeone = null;
      //     this.codetwo = null;
      //     this.codethree = null;
      //     this.codefour = null;
      //     this.passcode = '';
      //     this.int = 0

      //   }
      // }
    }
    // })
  }

  delete() {
    if (this.passcode.length > 0) {
      if (this.passcode.length == 1) {
        this.codeone = null
        this.int--
      } else if (this.passcode.length == 2) {
        this.codetwo = null;
        this.int--
      } else if (this.passcode.length == 3) {
        this.codethree = null;
        this.int--
      } else if (this.passcode.length == 4) {
        this.codefour = null;
        this.int--
      }
      this.passcode = this.passcode.substr(0, this.passcode.length - 1);
    }
  }

  confirm() {
    this.finalPin == this.codeone + this.codetwo + this.codethree + this.codefour;
    this.storage.set('Securitypin', this.codeone + this.codetwo + this.codethree + this.codefour);
    // this.navCtrl.push("HomePage");
    this.app.getRootNav().setRoot("HomePage");

  }


}
