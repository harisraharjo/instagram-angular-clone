import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { PostService } from "../post.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(private postService: PostService, private router: Router) {}

  error = false;

  ngOnInit() {}
  onSubmit(username: string, pass: string) {
    this.postService.login(username, pass).subscribe(data => {
      if (data["status"] == "sukses") {
        this.error = false;
        localStorage.setItem("username", data["username"]);
        localStorage.setItem("name", data["name"]);
        this.router.navigate(["/users", username]);
      } else {
        this.error = true;
      }
    });
  }
}
