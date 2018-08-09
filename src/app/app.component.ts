import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any [];
  constructor(private postService: PostsService,
              private modalService: NgbModal) {}
  title = 'webblog';
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.postService.getData()
    .subscribe(posts => {
      for (const p of posts) {
        this.postService.getComments(p.id)
        .subscribe(comment => p.comment = comment);
        console.log(p);
        // p.comment = this.postService.getComments(p.id);
      }
      this.posts = posts;
    });
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
