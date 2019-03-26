import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";
import { MessageProvider } from "../../../providers/message/message";

/**
 * Generated class for the MessageCreatorPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
	selector: 'message-creator-popover',
	templateUrl: 'message-creator-popover.html'
})
export class MessageCreatorPopoverComponent {

	message: any = {
		to:'',
		text:'',
		msg_type:''
	};

	constructor(public viewCtrl: ViewController,
		private messageProvider: MessageProvider) {
	}

	cancel() {
		this.viewCtrl.dismiss();
	}

	sendMessage() {
		if (this.message.to.trim() !== '' && this.message.text.trim() !== '') {
			this.message.msg_type = "dm";
			this.messageProvider.sendMessage(this.message);
			this.cancel();
		}
	}

}
