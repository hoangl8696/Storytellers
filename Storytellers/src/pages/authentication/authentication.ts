import { PasswordRetypeValidator } from './../../validators/password-retype-validator';
import { ApiHelper } from './../../providers/api-helper';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsernameValidator } from '../../validators/username-validator';
import { Form } from '../../data-model/form';

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {

  private loginForm: FormGroup;
  private signupForm: FormGroup;
  private formTongle: boolean;
  private formType: string;
  private formData: Form

  constructor(public navCtrl: NavController, public navParams: NavParams, private formbuilder: FormBuilder, private apihelper: ApiHelper) {
    this.formTongle = true;
    this.formType = "Signup";
    this.buildLoginForm();
    this.buildSignupForm();

  }

  public login() {
    this.apihelper.login(this.extractData("login")).subscribe(res => {
      console.log(res);
    });
  }

  public signup() {
    this.apihelper.signup(this.extractData("signup")).subscribe(res => {
      console.log(res);
    });
  }

  public switchForm() {
    this.formTongle = !this.formTongle;
    if (this.formTongle) {
      this.formType = "Signup";
    } else {
      this.formType = "Login";
    }
  }

  private extractData(formType: string): {} {
    switch (formType) {
      case "login":
        this.formData = new Form(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
        return this.formData.getData();
      case "signup":
        if (this.signupForm.controls['fullname'].value) {
          this.formData = new Form(this.signupForm.controls['username'].value, this.signupForm.controls['password'].value,
            this.signupForm.controls['email'].value, this.signupForm.controls['fullname'].value);
        } else {
          this.formData = new Form(this.signupForm.controls['username'].value, this.signupForm.controls['password'].value,
            this.signupForm.controls['email'].value);
        }
        return this.formData.getData();
    }
  }

  private buildSignupForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])]
    });
  }

  private buildLoginForm() {
    this.signupForm = this.formbuilder.group({
      username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required]), new UsernameValidator(this.apihelper).checkUsername],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      retype: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      fullname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])]
    }, { validator: PasswordRetypeValidator.validate });
  }

}
