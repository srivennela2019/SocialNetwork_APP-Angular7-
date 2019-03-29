import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PostsService } from "src/app/posts/posts.service";
import * as jwt_decode from "jwt-decode";
@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
  providers: [PostsService]
})
export class PostsComponent implements OnInit {
  constructor(private _http: HttpClient, private _post: PostsService) {}
  posts: any = [];
  comments: any = [];
  likes: any = [];
  title: any;
  obs: any;
  obc: any;
  like: any;
  plike: any;
  lc: any;
  tot_likes: any;
  newlike: any = [];
  disable: any;
  content: any;
  comment: any;
  newcomment: any = {};
  current_user: any;
  current_user_comp: any;
  current_user_jwt: any;
  newpost: any = {};
  edit: any = {};
  getDecodedAccessToken(token: string): any {
    try {
      return JSON.stringify(jwt_decode(token).datauser[0].username);
    } catch (Error) {
      return null;
    }
  }

  ngOnInit() {
    this._post.getPosts().subscribe(data => {
      this.posts = data;
    });
    this._post.getComments().subscribe(data => {
      this.comments = data;
    });
    this._post.getLikes().subscribe(data => {
      this.likes = data;
    });
    this.current_user_jwt = localStorage.getItem("token");
    this.current_user = jwt_decode(this.current_user_jwt).datauser;
    this.current_user_comp = JSON.stringify(this.current_user[0].username);
  }
  updatePosts(data) {
    this._post.getPosts().subscribe(data => {
      this.posts = data;
    });
  }
  updateComments(data) {
    this._post.getComments().subscribe(data => {
      this.comments = data;
    });
  }
  updateLikes(data) {
    this._post.getLikes().subscribe(data => {
      this.likes = data;
    });
  }
  Post() {
    this.newpost = {
      token: this.current_user_jwt,
      head: this.title,
      body: this.content,
      likes: 0
    };
    this._post.NewPost(this.newpost).subscribe(data => {
      this.updatePosts(data);
      alert("Post Created!");
    });
  }
  Delete(id: any) {
    this._post.deleteComments(id).subscribe(data => {
      this.updateComments(data);
    });
    this._post.deletePost(id).subscribe(data => {
      this.updatePosts(data);
    });
    this._post.deleteLikes(id).subscribe(data => {
      this.updateComments(data);
      alert("Post Deleted");
    });
  }
  Comment(postId: any) {
    this.newcomment = {
      token: this.current_user_jwt,
      postid: postId,
      comment: this.comment
    };
    this.obc = this._post.Comment(this.newcomment);
    this.obc.subscribe(data => {
      this.updateComments(data);
      alert("Comment Created!");
    });
  }
  Like(id: any) {
    this.plike = this._post.getPost(id).subscribe(data => {
      this._post.UpdateLikes(id, data.likes + 1).subscribe(datal => {
        this._post
          .updateLikesList(id, this.current_user_jwt)
          .subscribe(datax => {
            this.updateLikes(datax);
          });
        this.updatePosts(data);
      });
    });
  }
  Edit(id: any) {
    this._post.Edit(id, this.edit).subscribe(data => {
      this.updatePosts(data);
    });
  }
}
