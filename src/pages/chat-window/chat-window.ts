import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, PopoverController } from "ionic-angular";
import { MessageProvider } from "../../providers/message/message";
import { ChatWindowPopoverPage } from "./chat-window-popover/chat-window-popover";


@IonicPage()
@Component({
	selector: "page-chat-window",
	templateUrl: "chat-window.html"
})
export class ChatWindowPage {
	messages;
	userId: string = "";
	message: any = {};
	user: any = {};
	selectedMessages: Object = {};
	waitingMsg = [];
	isContentClear: boolean = false;
	constructor(
		public navCtrl: NavController,
		private messageProvider: MessageProvider,
		public navParams: NavParams,
		public popoverCtrl: PopoverController,
	) {
		this.userId = this.navParams.data.emailId;
		this.user = this.messageProvider.users[this.userId];

		this.messages = this.messageProvider.messages[this.userId.replace("@", "_")];
		this.waitingMsg = this.messageProvider.waitingMessages;
		console.log('msg.len = ', this.messages.length, ' ,waitngmsg = ', this.waitingMsg.length);
		if (this.messages.length > 0) {
			for (let i = 0; i < this.messages.length; i++) {
				this.messages[i].isDelivered = false;
				for (let j = 0; j < this.waitingMsg.length; j++) {
					if (this.messages[i].id === this.waitingMsg[j].id) {
						this.messages[i].isDelivered = true;
					}
				}
			}
		}
	}

	ionViewDidLoad() {
	}

	textchanged(evt) {
		if (evt) {
			this.message.text = evt;
		}
	}

	sendMessage() {
		if (this.message.text.trim() !== '') {
			this.message.to = this.userId;
			this.message.msg_type = "dm";
			this.isContentClear = true;
			// this.messages.push(this.message);
			this.messageProvider.sendMessage(this.message);

			this.message = {};
		}
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
			{

			},
			// { cssClass: "attach-popover" }
		);
		popover.present({
			// ev: event
		});
		popover.onDidDismiss((result) => {
			if (result == 'delete') {
				let i = this.messages.indexOf(msg, 0);
				this.messages.splice(i, 1);
				this.messageProvider.deleteMessage(msg);
				this.selectedMessages = {};
			} else {
				this.selectedMessages = {};
			}
		});
	}
}
