import { Component, OnInit} from '@angular/core';
import { Spotify } from 'src/app/services/spotify.service.ts.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs: any [] = [];
  loading: boolean = true;
  error: boolean = false;
  mensaje: String = " ";

  constructor(private servicioSpotify: Spotify) { 
    this.servicioSpotify.getNewReleases()
    .subscribe((data:any) => {
      this.songs = data;
      this.loading = false;
    }, (errorServicio: any) => {
      this.loading = false;
      this.error = true;
      this.mensaje = errorServicio.error.error.message;
    });
  }
        
  ngOnInit(){
    
  }
}

