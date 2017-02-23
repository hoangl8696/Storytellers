import { User } from './../providers/user';
import { ApiHelper } from './../providers/api-helper';
import { AuthenticationPage } from './../pages/authentication/authentication';
import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Front } from '../pages/front/front';
import { Page2 } from '../pages/page2/page2';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, private storage: Storage, private apihelper: ApiHelper, private user: User) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Front Page', component: Front },
      { title: 'Page Two', component: Page2 }
    ];
    this.storage.get('token').then(token => {
      if (token) {
        this.apihelper.getCurrentUser(token).subscribe(res => {
          this.user.setToken(token);
          this.user.setEmail(res.json().email);
          this.user.setUser_id(res.json().user_id);
          this.user.setUsername(res.json().username);
          this.rootPage = Front;
        });
      } else {
        this.rootPage = AuthenticationPage;
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
