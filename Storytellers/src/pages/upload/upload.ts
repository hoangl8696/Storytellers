import { User } from './../../providers/user';
import { ApiHelper } from './../../providers/api-helper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

/*
  Generated class for the Upload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {
  private uploadForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
    private apihelper: ApiHelper, private user: User, private toastCtrl: ToastController) {
    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      file: ['']
    });
  }

  public upload(event) {
    if (event.srcElement[6].files[0]) {
      this.uploadData(this.extractData(event));
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please choose file',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  private extractData(event: Event) {
    let form: FormData = new FormData();
    form.append('file', event.srcElement[6].files[0]);
    form.append('title', this.uploadForm.controls['title'].value)
    if (this.uploadForm.controls['description'].value) {
      form.append('description', this.uploadForm.controls['description'].value);
    }
    return form;
  }

  private uploadData(data) {
    this.apihelper.uploadFile(data, this.user.getToken())
      .map(res => res.json())
      .subscribe(res => {
        let data = {
          file_id: res.file_id,
          tag: "Storytime"
        }
        this.apihelper.tag(data, this.user.getToken())
          .subscribe(res => {
            this.navCtrl.pop();
          });
      });
  }

}
