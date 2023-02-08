import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private httpClient: HttpClient) {}

  private uri: string = 'http://127.0.0.1:4000/like';

  sendMessage(data: any) {
    return this.httpClient.post(`${this.uri}/send-message`, data);
  }
}
