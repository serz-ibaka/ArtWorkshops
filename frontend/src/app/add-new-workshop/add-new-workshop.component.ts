import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-add-new-workshop',
  templateUrl: './add-new-workshop.component.html',
  styleUrls: ['./add-new-workshop.component.css'],
})
export class AddNewWorkshopComponent {
  constructor(
    private workshopService: WorkshopService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  workshop: any = {
    name: '',
    datetime: '',
    place: '',
    location: {
      latitude: 0,
      longitude: 0,
    },
    shortDescription: '',
    longDescription: '',
    capacity: '',
    image: {},
    gallery: {},
    organizer: localStorage.getItem('username') ?? '',
  };

  importJSON(event: any) {
    if (event.target.files.length == 0) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const ws = JSON.parse(reader.result as string);
      this.workshop.name = ws.name;
      this.workshop.datetime = ws.datetime;
      this.workshop.place = ws.place;
      this.workshop.capacity = ws.capacity.free + ws.capacity.reserved;
      this.workshop.shortDescription = ws.short_description;
      this.workshop.longDescription = ws.long_description;
      this.workshop.image[ws.image_path] = 'imported';
      ws.gallery_path.forEach((e: any) => {
        this.workshop.gallery[e.image_path] = 'imported';
      });
      this.workshop.gallery_path = ws.gallery_path;
    };
    reader.readAsText(event.target.files[0]);
  }

  imageInput(event: any) {
    if (event.target.files.length == 0) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.workshop.image[event.target.files[0].name] = reader.result as string;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  galleryInput() {
    const galleryFiles =
      (document.getElementById('gallery') as HTMLInputElement).files ?? [];
    if (galleryFiles.length == 0) {
      return;
    }
    const readers: FileReader[] = [];
    let len = 5 - Object.keys(this.workshop.gallery).length;

    for (let i = 0; i < len && i < galleryFiles.length; i++) {
      const reader = new FileReader();
      readers.push(reader);
      reader.onload = (e) => {
        this.workshop.gallery[galleryFiles[i].name] = reader.result as string;
      };
    }

    for (let i = 0; i < len && i < galleryFiles.length; i++) {
      readers[i].readAsDataURL(galleryFiles[i]);
    }
  }

  removeGallery(name: any) {
    delete this.workshop.gallery[name];
  }

  onLocationSelected(event: any) {
    this.workshop.location.latitude = event[0];
    this.workshop.location.longitude = event[1];
  }

  addNewWorkshop() {
    this.workshopService.addNewWorkshop(this.workshop).subscribe((res: any) => {
      if (res['status'] == 'ok') {
        this._snackBar.open('Workshop request successfully sent', 'Close');
        this.router.navigate(['/']);
      }
    });
  }
}
