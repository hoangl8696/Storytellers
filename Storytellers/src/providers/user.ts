import { Injectable } from '@angular/core';

@Injectable()
export class User {

  private username: string;
  private token: string;
  private user_id: number;
  private email: string;
  private description: string;
  private avatar;

  public getAvatar() {
    return this.avatar;
  }

  public getDescription() {
    if (this.description) {
      return this.description
    }
    return "Your description";
  }

  public getUsername() {
    return this.username;
  }

  public getToken() {
    return this.token;
  }

  public getUser_id() {
    return this.user_id;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setUsername(name: string) {
    this.username = name;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public setUser_id(id: number) {
    this.user_id = id;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setAvatar (avatar) {
    this.avatar = avatar;
  }
}
