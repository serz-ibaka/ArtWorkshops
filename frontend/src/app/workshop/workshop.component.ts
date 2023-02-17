import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css'],
})
export class WorkshopComponent implements OnInit {
  constructor(
    private workshopService: WorkshopService,
    private router: Router,
    private route: ActivatedRoute
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
      }
    });
  }

  workshop: any | null = null;
  gallery: any | null = null;
  image: any | null = null;
  currentIndex = 0;

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
}
