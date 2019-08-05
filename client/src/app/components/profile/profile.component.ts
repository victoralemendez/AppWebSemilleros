import { Component, OnInit } from '@angular/core';


import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: any;
  private filesToUpload: Array<File>;

  constructor(private userService: UserService) {
    this.user = null;
  }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    var identity = localStorage.getItem('identity');
    if (identity != null) {
      this.user = JSON.parse(identity);
    }
  }

  getUrlImage() {
    return this.userService.getUrlGetImage(this.user.image);
  }

  update() {
    if (this.filesToUpload && this.filesToUpload.length > 0) {
      this.userService.updateImage(this.user._id, this.filesToUpload)
        .then((result: any) => {
          this.user.image = result.image;
          localStorage.setItem('identity', JSON.stringify(this.user));
        });
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  
}
