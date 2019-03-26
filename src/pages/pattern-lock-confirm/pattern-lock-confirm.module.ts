import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatternLockConfirmPage } from './pattern-lock-confirm';

@NgModule({
  declarations: [
    PatternLockConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(PatternLockConfirmPage),
  ],
})
export class PatternLockConfirmPageModule {}
