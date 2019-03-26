import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';

import { ComponentsModule } from "../components/components.module";


import { IonicStorageModule } from "@ionic/storage";


import { FingerprintAIO } from "@ionic-native/fingerprint-aio";
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Network } from '@ionic-native/network';
import { AndroidPermissions } from '@ionic-native/android-permissions';




import { UserProvider } from '../providers/user/user';

import { PostCreatorPopoverComponent } from "./../pages/home/post-creator-popover/post-creator-popover";
import { MessageCreatorPopoverComponent } from "./../pages/home/message-creator-popover/message-creator-popover";
import { MessageProvider } from '../providers/message/message';
import { ChatWindowPopoverPage } from '../pages/chat-window/chat-window-popover/chat-window-popover';


@NgModule({
  declarations: [
    MyApp,
    PostCreatorPopoverComponent,
    MessageCreatorPopoverComponent,
    ChatWindowPopoverPage
    // HomePage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PostCreatorPopoverComponent,
    MessageCreatorPopoverComponent,
    ChatWindowPopoverPage
    // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    FingerprintAIO,
    GooglePlus,
    Facebook,
    Network,
    MessageProvider,
    AndroidPermissions,
    Toast
  ]
})
export class AppModule { }
