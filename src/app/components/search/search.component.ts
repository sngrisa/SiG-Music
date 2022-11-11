import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spotify } from '../../services/spotify.service.ts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  artists: any[] = [];
  loading: boolean = false;

  constructor(private spotify: Spotify) {}

  buscar = (termino: String) => {
    if (termino) {
      this.loading = true;
      this.spotify.getSearch(termino).subscribe((data: any) => {
        this.artists = data;
        this.loading = false;
      });
    }
  };
}
