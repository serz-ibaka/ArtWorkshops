import { Component, OnInit } from '@angular/core';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-all-workshops',
  templateUrl: './all-workshops.component.html',
  styleUrls: ['./all-workshops.component.css'],
})
export class AllWorkshopsComponent implements OnInit {
  constructor(private workshopService: WorkshopService) {}

  ngOnInit(): void {
    this.workshopService.getCurrentWorkshops().subscribe((res: any) => {
      this.workshops = res['workshops'];
      this.allWorkshop = this.workshops;
      this.images = res['images'];
    });
  }

  filterPlace() {
    this.workshops = this.allWorkshop.filter((w) =>
      w.place.includes(this.place)
    );
  }

  filterName() {
    this.workshops = this.allWorkshop.filter((w) => w.name.includes(this.name));
  }

  filterAll() {
    this.workshops = this.allWorkshop.filter(
      (w) => w.place.includes(this.place) && w.name.includes(this.name)
    );
  }

  sortDate() {
    if (this.dateSort == 1) {
      this.dateSort = -1;
      this.workshops.sort(
        (a, b) =>
          new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
      );
    } else {
      this.dateSort = 1;
      this.workshops.sort(
        (a, b) =>
          new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      );
    }
  }

  sortName() {
    if (this.nameSort == 1) {
      this.nameSort = -1;
      this.workshops.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      this.nameSort = 1;
      this.workshops.sort((a, b) => (a.name > b.name ? -1 : 1));
    }
  }

  workshops: any[] = [];
  allWorkshop: any[] = [];
  images: any[] = [];

  place = '';
  name = '';

  dateSort = 1;
  nameSort = 1;

  type = localStorage.getItem('type') ?? 'unregistered';

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
