import { Component, NgZone } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	PopoverController
} from "ionic-angular";

import { PostCreatorPopoverComponent } from "./post-creator-popover/post-creator-popover";
import { MessageCreatorPopoverComponent } from "./message-creator-popover/message-creator-popover";
import { UserProvider } from "../../providers/user/user";
import { MessageProvider } from "../../providers/message/message";
import { ChatWindowPopoverPage } from "../chat-window/chat-window-popover/chat-window-popover";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	uiMode: any;
	users: object = {};
	timelineMessages: any[] = [];
	json = JSON;
	selectedMessages: object = {};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public popoverCtrl: PopoverController,
		public messageProvider: MessageProvider,
		public userProvider: UserProvider,
		public _ngZone: NgZone,
		private storage: Storage,
	) {
		this.uiMode = "tml";
		this._ngZone.run(() => {
			this.messageProvider.userAddedStatus.subscribe(status => {
				this.users = this.messageProvider.users;
				console.log("this.users==>", this.users)

			})
			this.messageProvider.postAddedStatus.subscribe(status => {
				this.timelineMessages = this.messageProvider.messages["post"]

			})
		})

	}

	ionViewDidLoad() {
		this.uiMode = "tml";

	}

	ionViewCanEnter(): Promise<void> {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	openPostCreater(event) {
		let popover = this.popoverCtrl.create(
			PostCreatorPopoverComponent,
			{},
			{
				cssClass: "popover-post-create"
			}
		);
		popover.present({ ev: event });
	}

	openMessageCreater(event) {
		let popover = this.popoverCtrl.create(
			MessageCreatorPopoverComponent,
			{},
			{
				cssClass: "popover-message-create"
			}
		);
		popover.present({ ev: event });
	}



	selectMessage(evt, msg) {
		evt.isSelected = !evt.isSelected;
		this.selectedMessages[msg.id] = !this.selectedMessages[msg.id];
		if (this.selectedMessages[msg.id]) {
			this.presentPopover(msg);
		} else {
			this.selectedMessages[msg.id] = {};
		}
	}



	presentPopover(msg) {
		let popover = this.popoverCtrl.create(
			ChatWindowPopoverPage,
			{},
		);
		popover.present({

		});
		popover.onDidDismiss((result) => {
			if (result == 'delete') {
				let i = this.timelineMessages.indexOf(msg, 0);
				this.timelineMessages.splice(i, 1);
				this.messageProvider.deleteMessage(msg);
				this.selectedMessages = {};
			} else {
				this.selectedMessages = {};
			}
		});
	}

	goToChatWindow(user) {
		console.log('user = ', user);
		// [navPush]="'ChatWindowPage'" [navParams]="user"
		this.navCtrl.push("ChatWindowPage", {
			emailId: user.emailId,
		});
	}
}
