import { User } from './../../providers/user';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class Front {

  constructor(public navCtrl: NavController, private storage: Storage, private user: User) {

  }

  ionViewDidEnter () {
    console.log(this.user);
  }
}
