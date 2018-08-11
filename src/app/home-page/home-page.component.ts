import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router, Routes } from '@angular/router';
import { FormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthGuardGuard } from '../auth.guard'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  posts: any [];
  new_comment: any;
  inManage = true;
  account = this.formBuilder.group({
    user: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  })
  constructor(private postService: PostsService,
              private modalService: NgbModal,
              private router: Router,
              private formBuilder: FormBuilder,
              private guard : AuthGuardGuard,
              private auth: AuthService) { }

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
        p.date = new Date();
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
  login() {
    this.inManage = false;
    if (this.account.value.user === 'admin' && this.account.value.pass === 'K5uGP8m') {
      console.log('loged');
      this.auth.login();
      this.router.navigate(['/manage']);
    }
  }
  addComment(postt) {
    postt.comment.push(this.new_comment);
    console.log(postt.comment);
  }

}
