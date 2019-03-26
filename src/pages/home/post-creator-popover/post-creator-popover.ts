import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";
import { MessageProvider } from "../../../providers/message/message";

/**
 * Generated class for the PostCreatorPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "post-creator-popover",
  templateUrl: "post-creator-popover.html"
})
export class PostCreatorPopoverComponent {
  message: any = {
    title: '',
    story: '',
    imageUrl: ''
  };

  constructor(public viewCtrl: ViewController,
    private messageProvider: MessageProvider) {
  }


  close() {
    this.viewCtrl.dismiss();
  }

  sendPost() {
    this.message.msg_type = "post";
    this.messageProvider.sendPostMessage(this.message);
    this.close();
  }

}
