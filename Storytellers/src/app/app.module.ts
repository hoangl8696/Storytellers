import { CardComponent } from './../components/card/card';
import { Thumbnails } from './../pipes/thumbnails';
import { Storage } from '@ionic/storage';
import { User } from './../providers/user';
import { AuthenticationPage } from './../pages/authentication/authentication';
import { ApiHelper } from './../providers/api-helper';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Front } from '../pages/front/front';
import { Page2 } from '../pages/page2/page2';

@NgModule({
  declarations: [
    MyApp,
    Front,
    Page2,
    AuthenticationPage,
    Thumbnails,
    CardComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Front,
    Page2,
    AuthenticationPage,
    CardComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ApiHelper, User, Storage]
})
export class AppModule {}
