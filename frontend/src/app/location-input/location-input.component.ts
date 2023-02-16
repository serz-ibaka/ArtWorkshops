import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import * as L from 'leaflet';

declare var Maptiler: any;

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.css'],
})
export class LocationInputComponent {
  @Output() locationSelected = new EventEmitter<[number, number]>();

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  constructor() {}

  ngOnInit() {
    this.map = L.map('map').setView([48.24703819368753, 16.368240946449568], 3);

    L.tileLayer(
      'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=DZHqLovWZKPpKGARsObh',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          crossOrigin: true
      }
    ).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.map != undefined) {
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
        this.locationSelected.emit([e.latlng.lat, e.latlng.lng]);
      }
    });
  }
}
