import { Card } from './../../data-model/card';
import { Component, Input } from '@angular/core';

/*
  Generated class for the Card component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'card',
  templateUrl: 'card.html'
})
export class CardComponent {

  @Input('cardData') cardData: Card;
  private card: Card;

  constructor() {
  }

  ngOnChanges() {
    this.card = this.cardData
  }

}
