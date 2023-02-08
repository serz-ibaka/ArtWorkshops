import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  private uri: string = 'http://127.0.0.1:4000/comment';

  postComment(data: any) {
    return this.httpClient.post(`${this.uri}/post-comment`, data);
  }

  editComment(data: any) {
    return this.httpClient.post(`${this.uri}/edit-comment`, data);
  }

  deleteComment(data: any) {
    return this.httpClient.post(`${this.uri}/delete-comment`, data);
  }
}
