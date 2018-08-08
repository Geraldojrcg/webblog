import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts_url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
      return this.http.get(this.posts_url)
      .pipe(catchError(this.handleError('getPosts', [])));
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
