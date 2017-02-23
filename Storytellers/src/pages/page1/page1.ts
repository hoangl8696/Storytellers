import { User } from './../../providers/user';
import { AuthenticationPage } from './../authentication/authentication';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController, private storage: Storage, private user: User) {

  }

  ionViewDidEnter () {
    console.log(this.user);
  }
}
