import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account-participant',
  templateUrl: './account-participant.component.html',
  styleUrls: ['./account-participant.component.css'],
})
export class AccountParticipantComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  username = localStorage.getItem('username') ?? '';
  workshops: any[] = [];

  displayedColumns: string[] = ['name', 'place', 'datetime'];
  participated: any = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    this.userService
      .getAppliedWorkshops(this.username)
      .subscribe((res: any) => {
        this.workshops = res['workshops'].filter(
          (x: any) => new Date(x.datetime).getTime() < Date.now()
        );
        this.participated = new MatTableDataSource(this.workshops);
      });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.participated.sort = this.sort;
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
