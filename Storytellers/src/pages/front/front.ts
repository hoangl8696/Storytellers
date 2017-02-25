import { ApiHelper } from './../../providers/api-helper';
import { Card } from './../../data-model/card';
import { User } from './../../providers/user';
import { Storage } from '@ionic/storage';
import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, LoadingController, Content } from 'ionic-angular';


@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class Front {

  @ViewChild(Content) content: Content;

  private mediaList: Card[];
  private loadStatus: number;
  private isScrollUp: boolean;

  constructor(public navCtrl: NavController, private storage: Storage, private user: User,
    private apihelper: ApiHelper, private loadingCtrl: LoadingController, private zone: NgZone) {
    this.mediaList = [];
    this.loadStatus = 0;
    this.isScrollUp = false;
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading data'
    });
    loader.present();
    this.getMediaList()
      .then(res => {
        console.log(this.mediaList);
        loader.dismiss();
      });
  }

  ionViewDidEnter() {
    this.content.ionScrollEnd.subscribe(res => {
      if (res.directionY === 'up' && res.scrollTop > 3000) {
        this.zone.run(() => {
          this.isScrollUp = true;
        });
      } else {
        this.zone.run(()=>{
          this.isScrollUp = false;
        });
      }
    });
  }

  public refresh(event) {
    this.mediaList = [];
    this.loadStatus = 0;
    this.getMediaList()
      .then(res => {
        console.log(this.mediaList);
        event.complete();
      });
  }

  public loadMore(event) {
    this.loadStatus = this.loadStatus + 1;
    this.getMediaList()
      .then(res => {
        event.complete();
      })
  }

  public goUp(event) {
    this.content.scrollToTop().then(res => {
      this.isScrollUp = false;
    });
  }

  private getMediaList() {
    return new Promise(resolve => {
      this.apihelper.getMedia((this.loadStatus * 20), 20)
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
        });
    });

  }

}
