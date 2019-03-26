import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@IonicPage()
@Component({
	selector: 'page-pattern-lock',
	templateUrl: 'pattern-lock.html',
})
export class PatternLockPage {

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
	fingerPin: any;
	isFingerPrint: boolean;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private app: App,
		public faio: FingerprintAIO,
		public toastCtrl: ToastController,
		private androidPermissions: AndroidPermissions,
		public storage: Storage,
		private platform: Platform,
	) {

		this.passcode = '';
		this.storage.get('Securitypin').then(data => {
			this.finalPin = data;
		});;

		this.message = true;
		this.pageStatus = "Enter Pin"
		this.int = 0;
		this.newPincount = 0;
		this.fingerPin = false;
		console.log('platform = ', platform);
		if (this.platform.is('ios') || this.platform.is('android')) {
			this.faio.isAvailable().then(data => {
				if (data) {
					this.isFingerPrint = true;
				} else {
					this.isFingerPrint = false;

				}
			});
		} else {
			this.app.getRootNav().setRoot("HomePage");
		}
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
			if (this.passcode.length == 4) {

				if (this.finalPin == this.codeone + this.codetwo + this.codethree + this.codefour) {
					// this.navCtrl.push('HomePage')
					this.app.getRootNav().setRoot("HomePage");

					this.message = true;
				} else {
					this.message = false;
				}


				// if (this.newPincount > 0) {
				//   if (this.finalPin == this.codeone + this.codetwo + this.codethree + this.codefour) {
				//     this.navCtrl.push('HomePage')
				//     this.message = true;
				//   } else {
				//     this.message = false;
				//   }
				// } else {
				//   this.pageStatus = "Confirm Pin"
				//   this.newPincount++
				//   this.finalPin = this.codeone + this.codetwo + this.codethree + this.codefour
				//   this.codeone = null;
				//   this.codetwo = null;
				//   this.codethree = null;
				//   this.codefour = null;
				//   this.passcode = '';
				//   this.int = 0

				// }
			}
		}

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

	goTo() {
		// this.navCtrl.setRoot(HomePage).then(() => {

		// }); 
		// this.navCtrl.push('HomePage');
		this.app.getRootNav().setRoot("HomePage");

	}
	open() {
		this.faio.show({
			clientId: 'Fingerprint-Demo',
			clientSecret: 'password', //Only necessary for Android
			disableBackup: true,  //Only for Android(optional)
			localizedFallbackTitle: 'Use Pin', //Only for iOS
			localizedReason: 'Please authenticate' //Only for iOS
		})
			.then((result: any) => {
				this.goTo();
			})
			.catch((error: any) => {
				this.notify("You don't have permission for fingerprint lock. Please use Pin lock");
			});

		// this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.USE_FINGERPRINT).then(
		// 	result => {
		// 		if (result.hasPermission) {
		// 			this.fingerprint();
		// 		} else {
		// 			this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.USE_FINGERPRINT).then(data => {
		// 				this.fingerprint();
		// 			}).catch(err => {
		// 				this.notify("You don't have permission for fingerprint lock. Please use Pin lock")
		// 			})
		// 		}
		// 	}).catch(err => {
		// 		this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.USE_FINGERPRINT).then(data => {
		// 			this.fingerprint();
		// 		}).catch(err => {
		// 			this.notify("You don't have permission for fingerprint lock. Please use Pin lock")
		// 		})
		// 	})






	}


	fingerprint() {
		this.faio.isAvailable().then(data => {
			if (data.isAvailable) {
				this.faio
					.show({
						clientId: "eath-user",
						clientSecret: 'password', //Only necessary for Android
						disableBackup: true, //Only for Android(optional)
						localizedFallbackTitle: 'Use Pin', //Only for iOS
						localizedReason: "Please authenticate" //Only for iOS
					})
					.then((result: any) => {
						// this.navCtrl.push('HomePage')
						this.app.getRootNav().setRoot("HomePage");

					})
					.catch((error: any) => {
						console.error("fingerprint error", error);
						this.notify("Invalid finger print")

					});
			} else {
				this.notify("You don't have finger print lock in your mobile")
			}
		}).catch(err => {
			console.error("not present error", err)
		})
	}

	notify(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 2000,
			position: 'middle'
		});
		toast.present();
	}
}
