import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "src/app/auth/auth.service";
@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private _http: HttpClient, private auth: AuthService) {}
  getPosts() {
    return this._http.get("http://localhost:3000/api/social/posts", {
      headers: new HttpHeaders().set("authtoken", this.auth.checkLogin())
    });
  }
  getComments() {
    return this._http.get("http://localhost:3000/api/social/comments", {
      headers: new HttpHeaders().set("authtoken", this.auth.checkLogin())
    });
  }
  getLikes() {
    return this._http.get("http://localhost:3000/api/social/likes", {
      headers: new HttpHeaders().set("authtoken", this.auth.checkLogin())
    });
  }
  NewPost(newpost: any) {
    return this._http.post("http://localhost:3000/api/social/posts", newpost);
  }
  deleteComments(id: any) {
    return this._http.delete("http://localhost:3000/api/social/comments/" + id);
  }
  deletePost(id: any) {
    return this._http.delete("http://localhost:3000/api/social/posts/" + id);
  }
  deleteLikes(id: any) {
    return this._http.delete("http://localhost:3000/api/social/likes/" + id);
  }
  Comment(newcomm: any) {
    return this._http.post(
      "http://localhost:3000/api/social/comments",
      newcomm
    );
  }
  getPost(id: any) {
    return this._http.get("http://localhost:3000/api/social/posts/" + id);
  }
  UpdateLikes(id: any, nlikes: any) {
    return this._http.put("http://localhost:3000/api/social/posts/" + id, {
      likes: nlikes
    });
  }
  updateLikesList(id: any, user: any) {
    return this._http.post("http://localhost:3000/api/social/likes/", {
      utoken: user,
      postid: id
    });
  }
  Edit(id: any, edit: any) {
    return this._http.put("http://localhost:3000/api/social/posts/" + id, edit);
  }
}
