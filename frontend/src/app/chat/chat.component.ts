import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService
      .getChat({
        from: this.usernameFrom,
        to: this.usernameTo,
        workshop: this.workshop,
      })
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this.imageFrom = res['imageFrom'];
          this.imageTo = res['imageTo'];
          this.chat = res['chat'];
          this.workshopName = res['workshopName'];
        }
      });
  }

  @Input() usernameFrom: string = '';
  @Input() usernameTo: string = '';
  @Input() workshop: string = '';

  imageFrom = '';
  imageTo = '';
  chat: any[] = [];
  message = '';
  workshopName = '';

  send() {
    this.messageService
      .sendMessage({
        content: this.message,
        from: this.usernameFrom,
        to: this.usernameTo,
        workshop: this.workshop,
      })
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this.chat.push({
            datetime: res['datetime'],
            content: this.message,
            direction: 'sent',
          });
          this.message = '';
        }
      });
  }

  datetimeFormat(dateString: any) {
    const date = new Date(dateString);
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };

    const formattedDate = `${date.toLocaleDateString(
      'en-US',
      optionsDate
    )} ${date.toLocaleTimeString('en-US', optionsTime)}`;

    return formattedDate;
  }
}
