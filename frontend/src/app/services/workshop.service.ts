import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  constructor(private httpClient: HttpClient) {}

  private uri: string = 'http://127.0.0.1:4000/workshop';

  addNewWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/add-new-workshop`, data);
  }

  getCurrentWorkshops() {
    return this.httpClient.get(`${this.uri}/get-current-workshops`);
  }

  getTopWorkshops() {
    return this.httpClient.get(`${this.uri}/get-top-workshops`);
  }

  getWorkshop(id: string) {
    return this.httpClient.get(`${this.uri}/get-workshop/${id}`);
  }

  applyToWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/apply-to-workshop`, data);
  }

  subscribeToWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/subscribe-to-workshop`, data);
  }

  acceptApplication(data: any) {
    return this.httpClient.post(`${this.uri}/accept-application`, data);
  }

  rejectApplication(data: any) {
    return this.httpClient.post(`${this.uri}/decline-application`, data);
  }

  editInfo(data: any) {
    return this.httpClient.post(`${this.uri}/edit-info`, data);
  }

  cancelWorkshop(data: any) {
    return this.httpClient.post(`${this.uri}/cancel-workshop`, data);
  }
}
