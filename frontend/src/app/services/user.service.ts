import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private uri: string = 'http://127.0.0.1:4000/user';

  getUsernames() {
    return this.httpClient.get(`${this.uri}/get-usernames`);
  }

  getUser(username: string) {
    return this.httpClient.get(`${this.uri}/get-user/${username}`);
  }

  getActions(username: string) {
    return this.httpClient.get(`${this.uri}/get-actions/${username}`);
  }

  getMessages(username: string) {
    return this.httpClient.get(`${this.uri}/get-messages/${username}`);
  }

  getAppliedWorkshops(username: string) {
    return this.httpClient.get(`${this.uri}/get-applied-workshops/${username}`);
  }

  checkAttended(params: any) {
    return this.httpClient.get(`${this.uri}/check-attended`, { params });
  }

  cancelApplication(data: any) {
    return this.httpClient.post(`${this.uri}/cancel-application`, data);
  }

  updateUser(data: any) {
    return this.httpClient.post(`${this.uri}/update-user`, data);
  }

  updatePassword(data: any) {
    return this.httpClient.post(`${this.uri}/update-password`, data);
  }

  updateImage(data: any) {
    return this.httpClient.post(`${this.uri}/update-image`, data);
  }

  checkToken(params: any) {
    return this.httpClient.get(`${this.uri}/check-token`, { params });
  }

  forgotPassword(data: any) {
    return this.httpClient.post(`${this.uri}/forgot-password`, data);
  }

  setNewPassword(data: any) {
    return this.httpClient.post(`${this.uri}/set-new-password`, data);
  }
}
