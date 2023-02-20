import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-workshops',
  templateUrl: './admin-workshops.component.html',
  styleUrls: ['./admin-workshops.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdminWorkshopsComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminService.getAllWorkshops().subscribe((res: any) => {
      if (res['status'] == 'ok') {
        this.pendingWorkshops = res['workshops'].filter(
          (w: any) => w.status == 'pending'
        );
        this.activeWorkshops.data = res['workshops'].filter(
          (w: any) => w.status == 'active'
        );
        this.upgradeRequests = res['workshops'].filter(
          (w: any) => w.status == 'pending-update'
        );
      }
    });
  }

  activeWorkshops = new MatTableDataSource<any>([]);
  columnsActive = ['name', 'datetime', 'place', 'short_description'];
  columnsActiveExpand = [...this.columnsActive, 'expand'];
  expandedActive: any | null = null;

  updateWorkshop(_id: string) {
    this.adminService
      .updateWorkshop(this.activeWorkshops.data.find((w) => w._id == _id))
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this._snackBar.open(`Workshop succesfully updated`, 'Close');
        }
      });
  }

  removeWorkshop(_id: string) {
    this.adminService.removeWorkshop({ _id }).subscribe((res: any) => {
      if (res['status'] == 'ok') {
        this._snackBar.open(`succesfully deleted`, 'Close');
      }
    });
    this.activeWorkshops.data = this.activeWorkshops.data.filter(
      (w) => w._id != _id
    );
  }

  pendingWorkshops: any[] = [];
  displayedColumnsPending = [
    'name',
    'datetime',
    'place',
    'short_description',
    'organizer',
    'accept',
    'reject',
  ];

  acceptWorkshop(_id: string) {
    this.adminService.acceptWorkshop({ _id: _id }).subscribe((res: any) => {
      const workshop = this.upgradeRequests.find((w) => w._id == _id);
      workshop.status = 'active';
      this.upgradeRequests = this.upgradeRequests.filter((w) => w._id != _id);
      this.activeWorkshops.data = [...this.activeWorkshops.data, workshop];
      if (res['status'] == 'ok') {
        this._snackBar.open(`Workshop accepted`, 'Close');
      } else {
        this._snackBar.open(`${res['message']}`, 'Close');
      }
    });
  }

  rejectWorkshop(_id: string) {
    const workshop = this.pendingWorkshops.find((w) => w._id == _id);
    workshop.status = 'reject';
    this.pendingWorkshops = this.pendingWorkshops.filter((w) => w.id != _id);
    this.adminService.rejectWorkshop({ _id: _id }).subscribe((res: any) => {
      if (res['status'] == 'ok') {
        this._snackBar.open(`Workshop rejected`, 'Close');
      }
    });
  }

  upgradeRequests: any[] = [];
  displayedColumnsUpgrade = [
    'name',
    'datetime',
    'place',
    'short_description',
    'organizer',
    'accept',
    'reject',
  ];

  tabIndex = 0;
  tabChange(event: any) {
    this.tabIndex = event.index;
  }

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
    this.adminService.addWorkshop(this.workshop).subscribe((res: any) => {
      if (res['status'] == 'ok') {
        this._snackBar.open('Workshop successfully added', 'Close');
        this.router.navigate(['/']);
      }
    });
  }
}
