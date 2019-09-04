import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import { PostService } from "../post.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  headerName;
  username;
  hasPhotos: boolean = false;
  currentUser;
  posts;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("username") == null) {
      this.router.navigate(["/login"]);
    }
    this.route.paramMap.subscribe(params => {
      if (params.get("username") != null) {
        this.username = params.get("username");
      } else {
        this.username = localStorage.getItem("username");
      }
      this.postService.postinganUser(this.username).subscribe(data => {
        this.checkingCurrUser();
        if (data !== 0) {
          this.posts = data;
          this.hasPhotos = true;
        } else {
          this.hasPhotos = false;
        }
      });
    });
  }

  back() {
    this.location.back();
  }

  checkingCurrUser() {
    if (localStorage.getItem("username") == this.username) {
      this.headerName = this.username;
      this.currentUser = true;
    } else {
      this.currentUser = false;
      this.headerName = this.username;
    }
  }

  logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    this.router.navigate(["/login"]);
  }
}
