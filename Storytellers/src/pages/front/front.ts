import { ApiHelper } from './../../providers/api-helper';
import { Card } from './../../data-model/card';
import { User } from './../../providers/user';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class Front {

  private mediaList: Card[];
  private loadStatus: number;

  constructor(public navCtrl: NavController, private storage: Storage, private user: User,
    private apihelper: ApiHelper, private loadingCtrl: LoadingController) {
    this.mediaList = [];
    this.loadStatus = 0;
  }

  ionViewWillEnter() {
    this.getMediaList()
      .then(res => {
        console.log(this.mediaList);

      });
  }

  private getMediaList() {
    return new Promise(resolve => {
      let loader = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Loading data'
      });
      loader.present();
      this.apihelper.getMedia(this.loadStatus * 20, 20)
        .map(res => res.json())
        .subscribe(mediaList => {
          mediaList.map(media => {
            let card: Card = new Card(this.apihelper, this.user);
            card.setDescription(media.description);
            card.setFile_id(media.file_id);
            card.setMedia_type(media.media_type);
            card.setMime_type(media.mime_type);
            card.setTime_added(media.time_added);
            card.setTitle(media.title);
            card.setUser_id(media.user_id);
            card.setFile_name(media.filename);
            card.processData().then(res => {
              this.mediaList.push(card);
            });
          });
          resolve();
          loader.dismiss();
        });
    });

  }

}
