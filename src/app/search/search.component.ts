import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

import { PostService } from "../post.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  filtered;
  users;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("username") == null) {
      this.router.navigate(["/login"]);
    }
    this.postService
      .usersList(localStorage.getItem("username"))
      .subscribe(data => {
        this.users = data;
        this.listUser();
      });
  }

  filter(value) {
    this.filtered = this.users.filter(
      searchedUser =>
        searchedUser.username.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    if (value == "") {
      this.listUser();
    }
  }

  listUser() {
    this.filtered = this.users;
  }
}
