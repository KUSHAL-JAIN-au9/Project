import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { PipesModule } from "../../pipes/pipes.module";


@NgModule({
  declarations: [HomePage, ],
  entryComponents: [],
  imports: [IonicPageModule.forChild(HomePage),PipesModule]
})
export class HomePageModule {}
