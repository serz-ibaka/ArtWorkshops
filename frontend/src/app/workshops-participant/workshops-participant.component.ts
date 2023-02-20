import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-workshops-participant',
  templateUrl: './workshops-participant.component.html',
  styleUrls: ['./workshops-participant.component.css'],
})
export class WorkshopsParticipantComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  username = localStorage.getItem('username') ?? '';
  workshops: any;

  ngOnInit(): void {
    this.userService
      .getAppliedWorkshops(this.username)
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this.workshops = res['workshops'].filter((w: any) => {
            console.log(new Date(w.datetime).getTime());
            console.log(Date.now());
            console.log(new Date(w.datetime).getTime() - Date.now())
            console.log(12*60*60*1000)
            const diff = new Date(w.datetime).getTime() - Date.now();
            if (diff > 0 && diff > 12 * 60 * 60 * 1000) w.cancel = true;
            else w.cancel = false;
            return diff > 0;
          });
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

  cancelApplication(workshop: any) {
    this.userService
      .cancelApplication({ username: this.username, workshop: workshop.id })
      .subscribe((res: any) => {
        this._snackBar.open('Application cancelled', 'Close');
      });
  }
}
