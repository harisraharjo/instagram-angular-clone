import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import { PostService } from "../post.service";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {
  headerName: string = "Photo";
  currentUser = localStorage.getItem("username");
  username;
  name;
  postId: number;
  photos;
  date;
  caption;
  totalLikes;
  isLiked: boolean = false;
  commentText: string = "";
  showComments: boolean = false;
  netizenCmt;
  countGambar;
  searchVal: string = "";

  constructor(
    private location: Location,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("username") == null) {
      this.router.navigate(["/login"]);
    }

    this.route.paramMap.subscribe(params => {
      this.postService
        .detailPosting(+params.get("postId"), this.currentUser)
        .subscribe(data => {
          this.username = data["username"];
          this.postId = +params.get("postId");
          this.photos = data["gambar"];
          this.date = data["tanggal"];
          this.caption = data["caption"];
          this.totalLikes = data["totalLikes"];
          this.netizenCmt = data["balasanKomen"];
          this.countGambar = data["gambar"].length;
          if (data["isLiked"] === 1) {
            this.isLiked = true;
          } else {
            this.isLiked = false;
          }

          if (this.showComments == false) {
            this.commentText =
              "View All " + this.netizenCmt.length + " Comments";
          } else {
            this.commentText = "Hide All Comments";
          }
        });
    });
  }

  back() {
    this.location.back();
  }

  addComment(komen: string) {
    this.postService
      .commentsPostingan(this.postId, this.currentUser, komen)
      .subscribe(data => {
        this.ngOnInit();
        this.searchVal = null;
      });
  }

  addLikes() {
    this.postService
      .likesPhoto(this.postId, this.currentUser)
      .subscribe(data => {
        this.totalLikes = data["totalLikes"];
        if (data["isLiked"] == 1) {
          this.isLiked = true;
        } else {
          this.isLiked = false;
        }
        this.ngOnInit();
      });
  }

  showAllComments() {
    if (this.showComments == false) {
      this.commentText = "Hide All Comments";
      this.showComments = true;
    } else {
      this.commentText = "View All " + this.netizenCmt.length + " Comments";
      this.showComments = false;
    }
  }
}
