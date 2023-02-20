import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private httpClient: HttpClient) {}

  private uri: string = 'http://127.0.0.1:4000/message';

  sendMessage(data: any) {
    return this.httpClient.post(`${this.uri}/send-message`, data);
  }

  getChat(params: any) {
    return this.httpClient.get(`${this.uri}/get-chat`, { params });
  }

  getUserChats(params: any) {
    return this.httpClient.get(`${this.uri}/get-user-chats`, { params });
  }

  getWorkshopChats(params: any) {
    return this.httpClient.get(`${this.uri}/get-workshop-chats`, { params });
  }
}
