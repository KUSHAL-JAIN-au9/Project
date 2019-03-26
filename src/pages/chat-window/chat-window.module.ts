import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatWindowPage } from './chat-window';

import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ChatWindowPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ChatWindowPage),
  ],
})
export class ChatWindowPageModule {}
