import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AndroidPermissions } from "@ionic-native/android-permissions";

import { UserProvider } from "../providers/user/user";
// import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private androidPermissions: AndroidPermissions,
    private userProvider: UserProvider
  ) {
    platform.ready().then(() => {
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.USE_FINGERPRINT
      ]);

      this.userProvider.isLoggedIn()
        .then(val => {
          if (val) {
            this.rootPage = "PatternLockPage";
          } else {
            this.rootPage = "login-page";
          }
        })
        .catch(err => {
          this.rootPage = "login-page";
        });
      

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // if (){

      // }
    });
  }
}
