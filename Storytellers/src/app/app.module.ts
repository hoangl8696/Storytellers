import { Storage } from '@ionic/storage';
import { User } from './../providers/user';
import { AuthenticationPage } from './../pages/authentication/authentication';
import { ApiHelper } from './../providers/api-helper';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    AuthenticationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    AuthenticationPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ApiHelper, User, Storage]
})
export class AppModule {}
