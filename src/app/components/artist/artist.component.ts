import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Spotify } from 'src/app/services/spotify.service.ts.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit {
  artist: any = {};
  topTracks: any[] = [];
  loading: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private spotifyService: Spotify,
    private sanitizer: DomSanitizer
  ) {}

  getArtist = (id: String) => {
    this.loading = true;
    this.spotifyService
      .getArtist(id)
      .subscribe((data: any) => (this.artist = data), (this.loading = false));
  };

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.loading = true;
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getTopTracks = (id: String) => {
    this.spotifyService.getTopTracks(id).subscribe((tracks: any) => {
      this.topTracks = tracks;
      this.topTracks.forEach((t) => {
        t.sanitizedUri =
          this.sanitizer.bypassSecurityTrustResourceUrl(t.external_urls.spotify);
      });
    });
  };
}
