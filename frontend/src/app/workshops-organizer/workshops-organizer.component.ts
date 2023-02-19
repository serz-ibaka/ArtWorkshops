import { Component, OnInit } from '@angular/core';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshops-organizer',
  templateUrl: './workshops-organizer.component.html',
  styleUrls: ['./workshops-organizer.component.css'],
})
export class WorkshopsOrganizerComponent implements OnInit {
  constructor(private workshopService: WorkshopService) {}
  ngOnInit(): void {
  }
  workshops: any[] = [];
}
