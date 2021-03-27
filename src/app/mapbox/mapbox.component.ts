import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  public map!: mapboxgl.Map;

  constructor() {

   }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12,
    center: [-122.447303, 37.753574]
    });
    this.map.on('load', () => {
      this.map.addSource('ethnicity', {
        type: 'vector',
        url: 'mapbox://examples.8fgz4egr'
      });
      this.map.addLayer({
        'id': 'population',
        'type': 'circle',
        'source': 'ethnicity',
        'source-layer': 'sf2010',
        'paint': {
          // make circles larger as the user zooms from z12 to z22
          'circle-radius': {
            'base': 1.75,
            'stops': [
              [12, 2],
              [22, 180]
            ]
          },
          // color circles by ethnicity, using a match expression
          // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
          'circle-color': [
            'match',
            ['get', 'ethnicity'],
            'White',
            '#fbb03b',
            'Black',
            '#223b53',
            'Hispanic',
            '#e55e5e',
            'Asian',
            '#3bb2d0',
            /* other */ '#ccc'
          ]
        }
      });
    });
  }
}
