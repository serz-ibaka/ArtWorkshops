import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import * as L from 'leaflet';

declare var Maptiler: any;

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css'],
})
export class LocationEditComponent implements OnInit {
  @Output() locationSelected = new EventEmitter<[number, number]>();

  @Input() latitude: number = 0;
  @Input() longitude: number = 0;

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  constructor() {}

  ngOnInit() {
    this.map = L.map('map').setView([this.latitude, this.longitude], 9);

    L.tileLayer(
      'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=DZHqLovWZKPpKGARsObh',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        crossOrigin: true,
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

    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
  }
}
