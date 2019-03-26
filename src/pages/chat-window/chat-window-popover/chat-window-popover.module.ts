import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatWindowPopoverPage } from './chat-window-popover';

@NgModule({
  declarations: [
    ChatWindowPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatWindowPopoverPage),
  ],
})
export class ChatWindowPopoverPageModule {}
