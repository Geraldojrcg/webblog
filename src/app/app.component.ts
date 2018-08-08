import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any;
  constructor(private postService: PostsService) {}
  title = 'webblog';
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.postService.getData()
    .subscribe(posts => this.posts = posts);
  }
}
