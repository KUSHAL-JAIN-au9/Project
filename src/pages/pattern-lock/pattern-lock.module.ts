import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatternLockPage } from './pattern-lock';

@NgModule({
  declarations: [
    PatternLockPage,
  ],
  imports: [
    IonicPageModule.forChild(PatternLockPage),
  ],
})
export class PatternLockPageModule {}
