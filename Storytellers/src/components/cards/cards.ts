import { PlayerPage } from './../../pages/player/player';
import { NavController, LoadingController } from 'ionic-angular';
import { Card } from './../../data-model/card';
import { Component, Input } from '@angular/core';

/*
  Generated class for the Cards component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'cards',
  templateUrl: 'cards.html'
})
export class CardsComponent {

  @Input('cardData') media: Card;
  private card: Card;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController) {
  }

  ngOnChanges() {
    this.card = this.media;
  }

  public view() {
    let loader = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading data'
    });
    loader.present();
    this.navCtrl.push(PlayerPage, this.card).then(() => {
      loader.dismiss();
    });
  }
}
