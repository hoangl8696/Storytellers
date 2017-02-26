import { FrontState } from './../../providers/front-state';
import { AuthenticationPage } from './../authentication/authentication';
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

  private isScrollUp: boolean;
  private isReady: boolean;

  constructor(public navCtrl: NavController, private storage: Storage, private user: User,
    private apihelper: ApiHelper, private loadingCtrl: LoadingController, private zone: NgZone, private state: FrontState) {
    this.isScrollUp = false;
    this.isReady = false;
  }

  ionViewWillEnter() {
    this.isReady = false;
    let loader = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading data'
    });
    loader.present();
    this.state.clearState();
    this.getMediaList()
      .then(res => {
        console.log(this.state.mediaList);
        loader.dismiss();
      });
  }

  ionViewDidEnter() {
    this.content.ionScrollEnd.subscribe(res => {
      if (res.directionY === 'up' && res.scrollTop > 3000) {
        this.zone.run(() => {
          this.isScrollUp = true;
        });
      } else if (res.scrollTop > 500) {
        this.zone.run(()=>{
          this.isReady = true;
        });
      } else {
        this.zone.run(() => {
          this.isScrollUp = false;
        });
      }
    });
  }

  public refresh(event) {
    this.state.clearState();
    this.getMediaList()
      .then(res => {
        console.log(this.state.mediaList);
        event.complete();
      });
  }

  public loadMore(event) {
          console.log('im called');
    this.state.loadStatus = this.state.loadStatus + 1;
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

  public logOut(event) {
    let loader = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading data'
    });
    loader.present();
    this.storage.clear()
      .then(res => this.navCtrl.setRoot(AuthenticationPage))
      .then(res => { loader.dismiss() });
  }

  private getMediaList() {
    console.log(this.state);

    return new Promise(resolve => {
      this.apihelper.getMedia((this.state.loadStatus * 9), 9)
        .map(res => res.json())
        .subscribe(mediaList => {
          this.extractData(mediaList, 0)
            .then(() => this.extractData(mediaList, 1))
            .then(() => this.extractData(mediaList, 2))
            .then(() => this.extractData(mediaList, 3))
            .then(() => this.extractData(mediaList, 4))
            .then(() => this.extractData(mediaList, 5))
            .then(() => this.extractData(mediaList, 6))
            .then(() => this.extractData(mediaList, 7))
            .then(() => this.extractData(mediaList, 8))
            .then(() => {
              resolve();
            });
        });
    });
  }

  private extractData(mediaList: Card[], counter) {
    return new Promise(resolve => {
      let card: Card = new Card(this.apihelper, this.user);
      let media: Card = mediaList[counter];
      card.setDescription(media.description);
      card.setFile_id(media.file_id);
      card.setMedia_type(media.media_type);
      card.setMime_type(media.mime_type);
      card.setTime_added(media.time_added);
      card.setTitle(media.title);
      card.setUser_id(media.user_id);
      card.setFile_name(media.filename);
      card.processData().then(res => {
        this.state.mediaList.push(card);
        console.log(this.state.mediaList);
        resolve();
      });
    });

  }

}
