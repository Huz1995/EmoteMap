import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';

import * as mapboxgl from 'mapbox-gl';

import { DatafetchService } from '../datafetch.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  public map!: mapboxgl.Map;

  constructor(private dataService: DatafetchService) {

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
        url: this.dataService.getDataSource() /*could change this to load each bit of data on its own - array of urls?*/
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
            '#ff0000',
            'Black',
            '#aa0055',
            'Hispanic',
            '#6a0095',
            'Asian',
            '#2b00d4',
            /* other */ '#ccc'
          ]
        }
      });
    });
  }
}
