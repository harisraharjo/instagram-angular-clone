import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { BottomNavigation } from "./bottom-navigation/bottom-navigation.component";
import { PostComponent } from "./post/post.component";
import { PostDetailsComponent } from "./post-details/post-details.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
  declarations: [
    AppComponent,
    BottomNavigation,
    PostComponent,
    SearchComponent,
    PostDetailsComponent,
    LoginComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
