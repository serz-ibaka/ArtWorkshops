import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private httpClient: HttpClient) {}

  private uri: string = 'http://127.0.0.1:4000/like';

  likeWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/like-workshop`, data);
  }

  unlikeWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/unlike-workshop`, data);
  }
}
