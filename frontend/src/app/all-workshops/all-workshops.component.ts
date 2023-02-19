import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-all-workshops',
  templateUrl: './all-workshops.component.html',
  styleUrls: ['./all-workshops.component.css'],
})
export class AllWorkshopsComponent implements OnInit {
  constructor(
    private workshopService: WorkshopService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.workshopService.getCurrentWorkshops().subscribe((res: any) => {
      this.workshops = res['workshops'];
      this.workshops.forEach((w) => (w.editing = false));
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
  editWorkshop: any | null = null;
  images: any[] = [];

  place = '';
  name = '';

  dateSort = 1;
  nameSort = 1;

  image = '';
  gallery = [];

  type = localStorage.getItem('type') ?? 'unregistered';
  username = localStorage.getItem('username') ?? '';

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

  edit(workshop: any) {
    this.workshops.forEach((w) => (w.editing = false));
    this.workshopService.getWorkshop(workshop._id).subscribe((res: any) => {
      this.editWorkshop = res['workshop'];
      workshop.editing = true;
      const ind = this.workshops.findIndex((v) => v._id == workshop._id);
      this.workshops[ind].editing = true;
    });
  }

  cancel() {
    const ind = this.workshops.findIndex((v) => v._id == this.editWorkshop._id);
    this.workshops[ind].editing = false;
    this.editWorkshop = null;
  }

  exportAsJSON() {
    const data = JSON.stringify(this.editWorkshop);
    const blob = new Blob([data], { type: 'text/plain' });
    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobURL;
    link.download = `${this.editWorkshop.name}.json`;

    link.click();
  }

  update() {}

  onLocationSelected(event: any) {
    this.editWorkshop.location.latitude = event[0];
    this.editWorkshop.location.longitude = event[1];
  }

  removeImage() {
    this.editWorkshop.image_path = '';
  }

  removeGallery(name: any) {
    this.editWorkshop.gallery_path = this.editWorkshop.gallery_path.filter(
      (g: any) => g != name
    );
  }

  addImage(event: any) {}

  addGallery(event: any) {}

  submit() {}

  cancelWorkshop() {
    this.workshopService
      .cancelWorkshop({ workshop: this.editWorkshop._id })
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this._snackBar.open('Workshop cancelled', 'Close');
        }
      });
  }

  acceptUser(username: string) {
    this.workshopService
      .acceptApplication({
        username,
        workshop: this.editWorkshop._id,
      })
      .subscribe((res: any) => {
        this._snackBar.open('User accepted', 'Close');
        const ind = this.editWorkshop.applications.findIndex(
          (a: any) => a.username == username
        );
        this.editWorkshop.applications[ind].status = 'accepted';
      });
  }

  rejectUser(username: string) {
    this.workshopService
      .acceptApplication({
        username,
        workshop: this.editWorkshop._id,
      })
      .subscribe((res: any) => {
        this._snackBar.open('User accepted', 'Close');
        const ind = this.editWorkshop.applications.findIndex(
          (a: any) => a.username == username
        );
        this.editWorkshop.applications[ind].status = 'rejected';
      });
  }
}
