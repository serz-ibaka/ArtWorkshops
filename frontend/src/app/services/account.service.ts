import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  uri: string = 'http://127.0.0.1:4000/account';

  register(data: any) {
    console.log(data);
    return this.httpClient.post(`${this.uri}/register`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.uri}/login`, data);
  }

  editInfo(data: any) {
    return this.httpClient.post(`${this.uri}/edit-info`, data);
  }

  forgotPassword(data: any) {
    return this.httpClient.post(`${this.uri}/forgot-password`, data);
  }
}
