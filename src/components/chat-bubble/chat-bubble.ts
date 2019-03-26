import { Component, Input } from "@angular/core";
import { UserProvider } from "../../providers/user/user";
import { MessageProvider } from "../../providers/message/message";


@Component({
  selector: "chat-bubble",
  templateUrl: "chat-bubble.html"
})
export class ChatBubbleComponent {
  @Input("message") msg;

  userId: any;
  position;
  constructor(public userProvider: UserProvider,
    private messageProvider: MessageProvider) {
    this.userId = this.userProvider.userInfo.emailId.replace("@", "_");



  }

  ngAfterViewInit() {
    // if (this.msg && this.msg.from == this.userId) {
    //   this.position = "right";
    // } else {
    //   this.position = "left";
    // }
  }
}
