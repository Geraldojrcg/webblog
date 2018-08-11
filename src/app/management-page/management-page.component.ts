import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.css']
})
export class ManagementPageComponent implements OnInit {
  posts: any [];
  categories = [{name: "Events"}];
  post = this.formBuilder.group({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });
  post_update = this.formBuilder.group({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });
  category = this.formBuilder.group({
    name: new FormControl('', Validators.required),
  });
  category_update = this.formBuilder.group({
    name: new FormControl('', Validators.required),
  });
  constructor(private postService: PostsService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private auth: AuthService) { }

  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.postService.getData()
    .subscribe(posts => {
      for (const p of posts) {
        let d = new Date();
        p.date = d.getDay() +'/'+d.getMonth()+'/'+d.getFullYear();
        console.log(p);
      }
      this.posts = posts;
    });
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  addPost(){
    this.posts.push(this.post.value)
  }
  updatePost(p){
    this.removePost(p);
    let d = new Date();
    this.post_update.value.date = d.getDay() +'/'+d.getMonth()+'/'+d.getFullYear();
    this.posts.push(this.post_update.value);
    
  }
  updateCategory(c){
    this.removeCategory(c);
    this.categories.push(this.category_update.value);
  }
  addCategory(){
    this.categories.push(this.category.value);
    console.log(this.categories);
  }
  removeCategory(c){
    const index = this.categories.indexOf(c);
    this.categories.splice(index, 1);
  }
  removePost(post){
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
  }

  logout(){
    this.auth.logout();
  }

}
