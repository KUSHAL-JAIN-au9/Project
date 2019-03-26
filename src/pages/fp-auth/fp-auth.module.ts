import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FpAuthPage } from './fp-auth';

@NgModule({
  declarations: [
    FpAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(FpAuthPage),
  ],
})
export class FpAuthPageModule {}
