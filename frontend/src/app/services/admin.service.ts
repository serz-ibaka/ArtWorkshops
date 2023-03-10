import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  uri: string = 'http://127.0.0.1:4000/admin';

  adminLogin(data: any) {
    return this.httpClient.post(`${this.uri}/admin-login`, data);
  }

  acceptUser(data: any) {
    return this.httpClient.post(`${this.uri}/accept-user`, data);
  }

  rejectUser(data: any) {
    return this.httpClient.post(`${this.uri}/reject-user`, data);
  }

  addUser(data: any) {
    return this.httpClient.post(`${this.uri}/add-user`, data);
  }

  updateUser(data: any) {
    return this.httpClient.post(`${this.uri}/update-user`, data);
  }

  removeUser(data: any) {
    return this.httpClient.post(`${this.uri}/remove-user`, data);
  }

  promoteUser(data: any) {
    return this.httpClient.post(`${this.uri}/promote-user`, data);
  }

  acceptWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/accept-workshop`, data);
  }

  rejectWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/reject-workshop`, data);
  }

  updateWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/update-workshop`, data);
  }

  removeWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/remove-workshop`, data);
  }

  addWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/add-workshop`, data);
  }

  getAllUsers() {
    return this.httpClient.get(`${this.uri}/get-all-users`);
  }

  getAllWorkshops() {
    return this.httpClient.get(`${this.uri}/get-all-workshops`);
  }
}
