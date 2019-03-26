// import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class UserProvider {
	user: any = {};
	constructor(
		private storage: Storage,
		private googlePlus: GooglePlus,
		private fb: Facebook
	) { }

	saveUserDatail(userInfo) {
		this.storage.set("user_info", userInfo);
		this.user = userInfo;
	}

	public get userInfo(): any {
		if (this.user && this.user.emailId) {
			return this.user;
		} else {
			this.storage.get("user_info").then(val => {
				return val;
			});
		}
	}

	isLoggedIn(): Promise<Boolean> {
		return new Promise((resolve, reject) => {
			if (this.user && this.user.emailId) {
				resolve(true);
			} else {
				this.storage.get("user_info").then(val => {
					//   return val;
					if (val && val.emailId) {
						this.user = val;
						resolve(true);
					} else {
						resolve(false);
					}
				});
			}
		});
	}

	googleLogin(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.googlePlus
				.login({
					// scopes: "", // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
					// webClientId:
					// 	"993644628333-scvso0kr916q96uj38l9oiubn0brinv3.apps.googleusercontent.com", // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
					// offline: true
				})
				.then(user => {
					console.info("logged in==>", user);
					this.user = {
						username: user.displayName,
						emailId: user.email,
						profileUrl: user.imageUrl
					};
					this.storage.set("user_info", this.user);
					resolve();
				})
				.catch(err => {
					console.error(err);
					reject();
				});
		});
	}

	facebookLogin(): Promise<any> {
		try {
			return new Promise((resolve, reject) => {
				this.fb.login(['public_profile', 'email'])
					.then((res: FacebookLoginResponse) => {
						this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
							console.info("logged in==>", profile);
							this.user = {
								emailId: profile['email'],
								profileUrl: profile['picture_large']['data']['url'],
								username: profile['name']
							}
							this.storage.set("user_info", this.user);
							resolve();
						}).catch(err => {
							reject();
							console.error('err = ', err);
						});
					}).catch(err => {
						console.error('err = ', err);
						reject();
					});
			});
		} catch (e) {
			console.error(e);
		}
	}

	login(user): Promise<any> {
		try {
			return new Promise((resolve, reject) => {
				this.user = user;
				console.log('user = ,user', user);
				this.storage.set("user_info", this.user);
				resolve();


			});
		} catch (e) {
			console.error(e);
		}
	}
}
