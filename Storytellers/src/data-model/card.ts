import { User } from './../providers/user';
import { ApiHelper } from './../providers/api-helper';
export class Card {
  private title: string;
  private description: string;
  private file_id: number;
  private file_name: string;
  private user_id: number;
  private media_type: string;
  private mime_type: string;
  private time_added;

  private username: string;
  private screenshot: string;
  private thumbnails: {};
  private likes: {}[];
  private comments: {}[];

  constructor(private apihelper: ApiHelper, private user: User) { }

  public setTitle(title: string) {
    this.title = title;
  }
  public setFile_name(file_name: string){
    this.file_name = file_name;
  }
  public setDescription(description: string) {
    this.description = description;
  }
  public setFile_id(file_id: number) {
    this.file_id = file_id;
  }
  public setUser_id(user_id: number) {
    this.user_id = user_id;
  }
  public setMedia_type(media_type: string) {
    this.media_type = media_type;
  }
  public setMime_type(mime_type: string) {
    this.mime_type = mime_type;
  }
  public setTime_added(time_added: string) {
    this.time_added = time_added;
  }

  // public getTitle(title: string) {
  //   return this.title;
  // }
  // public getDescription(description: string) {
  //   return this.description;
  // }
  // public getFile_id(file_id: number) {
  //   return this.file_id;
  // }
  // public getUser_id(user_id: number) {
  //   return this.user_id;
  // }
  // public getMedia_type(media_type: string) {
  //   return this.media_type;
  // }
  // public getMime_type(mime_type: string) {
  //   return this.mime_type;
  // }

  // public getTime_added(time_added: string) {
  //   return this.time_added;
  // }

  public processData() {
    return new Promise(resolve => {
      this.apihelper.getUser(this.user_id, this.user.getToken())
        .map(res => res.json())
        .subscribe(user => {
          this.username = user.username;
          switch (this.media_type) {
            case 'video':
              this.fetchScreenshot()
                .then(res => this.fetchLikes())
                .then(res => this.fetchComment())
                .then(res => this.fetchThumbnails())
                .then(res => {
                  resolve();
                });
              break;
            case 'image':
              this.fetchThumbnails()
                .then(res => this.fetchLikes())
                .then(res => this.fetchComment())
                .then(res => {
                  resolve();
                });
              break;
          }
        });
    });
  }

  private fetchComment() {
    return new Promise(resolve => {
      this.apihelper.getCommentsOfFile(this.file_id)
        .map(res => res.json())
        .subscribe(comments => {
          this.comments = comments;
          resolve();
        });
    });
  }

  private fetchLikes() {
    return new Promise(resolve => {
      this.apihelper.requestFavouritesById(this.file_id)
        .map(res => res.json())
        .subscribe(likes => {
          this.likes = likes;
          resolve();
        });
    });
  }

  private fetchThumbnails() {
    return new Promise(resolve => {
      this.apihelper.getFile(this.file_id)
        .map(res => res.json())
        .subscribe(media => {
          this.thumbnails = media.thumbnails;
          resolve();
        });
    });
  }

  private fetchScreenshot() {
    return new Promise(resolve => {
      this.apihelper.getFile(this.file_id)
        .map(res => res.json())
        .subscribe(media => {
          this.screenshot = media.screenshot;
          resolve();
        });
    });
  }
}
