import { Component, OnInit, NgZone } from '@angular/core';
import { PostsService } from './posts.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any [];
  new_comment: any;
  loged = false;
  constructor(private postService: PostsService,
              private modalService: NgbModal,
              private router: Router) {}
  title = 'webblog';
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.postService.getData()
    .subscribe(posts => {
      for (const p of posts) {
        this.postService.getComments(p.id)
        .subscribe(comment => {
          p.comment = comment;
        });
        p.photos = this.postService.getPhotos();
        console.log(p);
      }
      this.posts = posts;
    });
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-black-backdrop'});
  }
  login(user, pass) {
    this.loged = true;
    console.log('loged');
    this.router.navigate(['/manage']);
    if (user === 'admin' && pass === 'K5uGP8m') {
      console.log('loged');
    }
  }
  addComment(postt) {
    postt.comment.push(this.new_comment);
    console.log(postt.comment);
  }
}
