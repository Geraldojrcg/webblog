import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts_url = 'https://jsonplaceholder.typicode.com/posts?userId=1';
  comment_url = 'https://jsonplaceholder.typicode.com/posts/';
  photo_url = 'https://jsonplaceholder.typicode.com/photos?id=';
  posts: any;
  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
      return this.http.get(this.posts_url)
      .pipe(catchError(this.handleError('getPosts', [])));
  }
  getComments(id): Observable<any> {
    return this.http.get(this.comment_url + id + '/comments')
    .pipe(catchError(this.handleError('getComments', [])));
  }
  getPhotos() {
    const x = Math.floor((Math.random() * 5) + 1);
    const photos = [];
    for (let i = 0; i < x; i++) {
      this.http.get(this.photo_url + x).subscribe(
        photo => photos.push(photo)
      );
    }
    return photos;
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
