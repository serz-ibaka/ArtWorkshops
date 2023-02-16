import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
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
export class AdminUsersComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    let allUsers: any[] = [];
    this.adminService.getAllUsers().subscribe((res: any) => {
      if (res['status'] == 'ok') {
        allUsers = res['users'];
        console.log(allUsers);
        this.participants.data = allUsers.filter(
          (u) => u.status == 'active' && u.type == 'participant'
        );
        this.organizers.data = allUsers.filter(
          (u) => u.status == 'active' && u.type == 'organizer'
        );
        this.pendingUsers = allUsers.filter((u) => u.status == 'pending');
      }
    });
  }

  participants = new MatTableDataSource<any>([]);
  columnsParticipants = ['username', 'firstname', 'lastname', 'phone', 'email'];
  columnsParticipantsExpand = [...this.columnsParticipants, 'expand'];
  expandedParticipant: any | null = null;

  updateParticipant(username: string) {
    this.adminService
      .updateUser(this.participants.data.find((u) => u.username == username))
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this._snackBar.open(`User ${username} succesfully updated`, 'Close');
        }
      });
  }

  removeParticipant(username: string) {
    this.adminService.removeUser({ username }).subscribe((res: any) => {
      if (res['status'] == 'ok') {
        this._snackBar.open(`User ${username} succesfully deleted`, 'Close');
      }
    });
    this.participants.data = this.participants.data.filter((u) => u.username != username);
  }

  updateOrganizer(username: string) {
    this.adminService
      .updateUser(this.organizers.data.find((u) => u.username == username))
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this._snackBar.open(`User ${username} succesfully updated`, 'Close');
        }
      });
  }

  removeOrganizer(username: string) {
    this.adminService.removeUser({ username }).subscribe((res: any) => {
      if (res['status'] == 'ok') {
        this._snackBar.open(`User ${username} succesfully deleted`, 'Close');
      }
    });
    this.organizers.data = this.organizers.data.filter((u) => u.username != username);
  }

  organizers = new MatTableDataSource<any>([]);
  columnsOrganizers = ['username', 'firstname', 'lastname', 'phone', 'email'];
  columnsOrganizersExpand = [...this.columnsParticipants, 'expand'];
  expandedOrganizer: any | null = null;

  pendingUsers: any[] = [];
  displayedColumnsPending = [
    'username',
    'firstname',
    'lastname',
    'phone',
    'email',
    'accept',
    'reject',
  ];

  acceptUser(username: string) {
    const user = this.pendingUsers.find((u) => u.username == username);
    user.status = 'active';
    this.pendingUsers = this.pendingUsers.filter((u) => u.username != username);
    if (user.type == 'participant') {
      this.participants.data = [...this.participants.data, user];
    } else {
      this.organizers.data = [...this.organizers.data, user];
    }
    this.adminService
      .acceptUser({ username: username })
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this._snackBar.open(`User ${username} accepted`, 'Close');
        }
      });
  }

  rejectUser(username: string) {
    const user = this.pendingUsers.find((u) => u.username == username);
    user.status = 'active';
    this.pendingUsers = this.pendingUsers.filter((u) => u.username != username);
    this.adminService
      .rejectUser({ username: username })
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this._snackBar.open(`User ${username} rejected`, 'Close');
        }
      });
  }

  newUser = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    image: '',
    organizer: false,
    organizationName: '',
    organizationCountry: '',
    organizationCity: '',
    organizationZipCode: '',
    organizationStreet: '',
    organizationStreetNumber: '',
    organizationNumber: '',
  };

  newUserChangeImage(event: any) {
    if (event.target.files.length == 0) {
      return;
    }
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.src = event.target.result as string;
      image.src = reader.result as string;
      this.newUser.image = reader.result as string;
    };
    reader.readAsDataURL(imageFile);
  }

  addNewUser() {
    this.adminService.addUser(this.newUser).subscribe((res: any) => {
      if (res['status'] == 'ok') {
        this._snackBar.open('New user created', 'Close');
        this.newUser = {
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          email: '',
          phone: '',
          image: '',
          organizer: false,
          organizationName: '',
          organizationCountry: '',
          organizationCity: '',
          organizationZipCode: '',
          organizationStreet: '',
          organizationStreetNumber: '',
          organizationNumber: '',
        };
      }
    });
  }
}
