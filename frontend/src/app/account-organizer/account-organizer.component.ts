import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-account-organizer',
  templateUrl: './account-organizer.component.html',
  styleUrls: ['./account-organizer.component.css'],
})
export class AccountOrganizerComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService
      .getUserChats({ username: this.username })
      .subscribe((res: any) => {
        this.chats = res['chats'];
      });
  }

  chats: any[] = [];
  openChats: any[] = [];
  username = localStorage.getItem('username') ?? '';

  openChat(chat: any) {
    this.openChats.push(chat);
  }
}
