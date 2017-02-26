import { User } from './../../providers/user';
import { ApiHelper } from './../../providers/api-helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from './../../data-model/card';
import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {

  @ViewChild(Content) content: Content;
  @ViewChild('focusInput') input;

  private cardData: Card;
  private commentForm: FormGroup;
  private userComment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private apihelper: ApiHelper, private user: User, private zone: NgZone) {
    this.cardData = this.navParams.data;
    this.userComment = false;
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
    console.log(this.cardData);
  }

  public likes(event) {

  }

  public dismissComment(event) {
    this.commentForm.reset();
    this.userComment = false;
  }

  public comments(event) {
    this.userComment = true;
    this.content.scrollToBottom().then(() => {
      this.input.setFocus();
      Keyboard.show();
    });
  }

  public postComment(event) {
    let data = {
      file_id: this.cardData.file_id,
      comment: this.commentForm.controls['comment'].value
    };

    this.post(data)
      .then(res => this.updateUI())
      .then(res => {
        this.commentForm.reset();
        this.userComment = false;
      });
  }

  private post(data) {
    return new Promise(resolve => {
      this.apihelper.postComment(data, this.user.getToken()).subscribe(res => {
        resolve();
      });
    });
  }

  private updateUI() {
    return new Promise(resolve => {
      this.apihelper.getCommentsOfUser(this.user.getToken())
        .map(res => res.json())
        .subscribe(res => {

          let i = res.length - 1;
          let data = {
            comment: res[i].comment,
            comment_id: res[i].comment_id,
            file_id: res[i].file_id,
            time_added: res[i].time_added,
            user_id: res[i].user_id
          }

          this.cardData.comments.push(data);
          resolve();
        });
    });
  }
}
