import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    let appHttp = new HttpParams();
    appHttp = appHttp.set("username", username);
    appHttp = appHttp.set("password", password);
    return this.http.post<any>(
      "http://localhost/instantgram_php/login.php",
      appHttp
    );
  }

  commentsPostingan(
    idPost: number,
    username: string,
    comment: string
  ): Observable<any> {
    let appHttp = new HttpParams();
    appHttp = appHttp.set("username", username);
    appHttp = appHttp.set("idPosting", idPost.toString());
    appHttp = appHttp.set("comment", comment);
    return this.http.post<any>(
      "http://localhost/instantgram_php/commentPostingan.php",
      appHttp
    );
  }

  postinganUser(username: string): Observable<any> {
    let appHttp = new HttpParams();
    appHttp = appHttp.set("username", username);
    return this.http.post<any>(
      "http://localhost/instantgram_php/postinganUser.php",
      appHttp
    );
  }

  likesPhoto(idPost: number, username: string): Observable<any> {
    let appHttp = new HttpParams();
    appHttp = appHttp.set("idPosting", idPost.toString());
    appHttp = appHttp.set("username", username);
    return this.http.post<any>(
      "http://localhost/instantgram_php/likes.php",
      appHttp
    );
  }

  usersList(username: string): Observable<any> {
    let appHttp = new HttpParams();
    appHttp = appHttp.set("username", username);
    return this.http.post<any>(
      "http://localhost/instantgram_php/listUsers.php",
      appHttp
    );
  }

  detailPosting(idPost: number, username: string): Observable<any> {
    let appHttp = new HttpParams();
    appHttp = appHttp.set("username", username);
    appHttp = appHttp.set("idPosting", idPost.toString());
    return this.http.post<any>(
      "http://localhost/instantgram_php/detailPosting.php",
      appHttp
    );
  }
}
