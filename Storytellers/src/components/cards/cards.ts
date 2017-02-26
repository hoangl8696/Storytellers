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

  constructor() {
  }

  ngOnChanges() {
    this.card = this.media;
  }
}
