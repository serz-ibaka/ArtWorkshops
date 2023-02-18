import { Component, Input } from '@angular/core';
import * as L from 'leaflet';

declare var Maptiler: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent {
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  @Input() latitude: number = 0;
  @Input() longitude: number = 0;

  constructor() {}

  ngOnInit() {
    this.map = L.map('map').setView([this.latitude, this.longitude], 8);

    L.tileLayer(
      'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=DZHqLovWZKPpKGARsObh',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        crossOrigin: true,
      }
    ).addTo(this.map);

    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
  }
}
