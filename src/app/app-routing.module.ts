import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { PostComponent } from "./post/post.component";
import { PostDetailsComponent } from "./post-details/post-details.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  { path: "", component: PostComponent },
  { path: "login", component: LoginComponent },
  { path: "search", component: SearchComponent },
  { path: "users/:username", component: PostComponent },
  { path: "postingDetail/:postId", component: PostDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
