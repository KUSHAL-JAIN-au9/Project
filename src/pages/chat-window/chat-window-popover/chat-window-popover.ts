import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-chat-window-popover',
  templateUrl: 'chat-window-popover.html',
})
export class ChatWindowPopoverPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
  }

  close(value?) {
    this.viewCtrl.dismiss(value);
  }

}
