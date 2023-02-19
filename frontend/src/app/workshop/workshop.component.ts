import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LikeService } from '../services/like.service';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css'],
})
export class WorkshopComponent implements OnInit {
  constructor(
    private workshopService: WorkshopService,
    private userService: UserService,
    private likeService: LikeService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.workshopService.getWorkshop(id).subscribe((res: any) => {
      if (res['status'] == 'error') {
        this.router.navigate(['/']);
      } else {
        this.gallery = res['gallery'];
        this.image = res['image'];
        this.workshop = res['workshop'];

        this.userService
          .checkAttended({ username: this.username, name: this.workshop.name })
          .subscribe((res: any) => {
            this.likeable = res['attended'];
            const allLikes: any[] = res['likes'];
            console.log(allLikes);
            this.likes = allLikes.length;
            this.liked = allLikes.some((x) => x.username == this.username);
          });
      }
    });
  }

  username = localStorage.getItem('username') ?? '';
  workshop: any | null = null;
  gallery: any | null = null;
  image: any | null = null;
  currentIndex = 0;

  likeable = false;
  liked = false;
  likes = 0;
  color = 'basic';

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.gallery.length;
  }
  previousImage() {
    this.currentIndex =
      (this.currentIndex + this.gallery.length - 1) % this.gallery.length;
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

  apply() {
    this.workshopService
      .applyToWorkshop({
        username: this.username,
        workshop: this.workshop._id,
      })
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this._snackBar.open('You successfully applied for workshop', 'Close');
        }
      });
  }

  subscribe() {
    this.workshopService
      .subscribeToWorkshop({
        username: this.username,
        workshop: this.workshop._id,
      })
      .subscribe((res: any) => {
        if (res['status'] == 'ok') {
          this._snackBar.open(
            'You will receive an email when a spot becomes free',
            'Close'
          );
        }
      });
  }

  like() {
    if (this.liked) {
      this.likeService
        .unlikeWorkshop({
          username: this.username,
          workshop: this.workshop._id,
        })
        .subscribe((res: any) => {
          this.liked = false;
          this.likes--;
          this.color = 'basic';
        });
    } else {
      console.log('asdasdas');
      this.likeService
        .likeWorkshop({
          username: this.username,
          workshop: this.workshop._id,
        })
        .subscribe((res: any) => {
          this.liked = true;
          this.color = 'warn';
          this.likes++;
        });
    }
  }
}
