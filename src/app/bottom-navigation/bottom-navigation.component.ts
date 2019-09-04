import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-bottom-navigation",
  templateUrl: "./bottom-navigation.component.html",
  styleUrls: ["./bottom-navigation.component.css"]
})
export class BottomNavigation implements OnInit {
  loggedIn = false;

  constructor() {}

  ngOnInit() {
    if (localStorage.getItem("username") !== null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
}
