import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Spotify {

  constructor(private http: HttpClient) { 
    console.log('Servicio listo para usar de SiG Music');
  }


  getQuery = (query: String) =>{
   
    const url = `https://api.spotify.com/v1/${query}`;

     const headers = new HttpHeaders({ 'Authorization':'Bearer BQBptqV97qSRMiK4GwqLTcDuRViSoq1s0XX27d2wJbDmNznmnpGwDCvkYywD6eJUokHlyHBu9DNiKjK_auDUwUMjG1FOH6TFeIHJy-LNJ428RE_bpN5Sgh4mSfIBxERJe5YfCcmaz_BBLmsdz_IyPV3-ZC0XoWJnBxrafGD2dKOlBSMFEg'});

    return this.http.get(url, {headers});
  };
  

  getNewReleases = (): any =>{
      return this.getQuery('browse/new-releases?offset=0&limit=20')
      .pipe(map((data:any) => data.albums.items));
  };

  getSearch = (termino:String): any =>{
    return this.getQuery(`search?q=${termino}&type=artist`)
    .pipe(map((data:any) => data.artists.items));
  };

  getArtist = (id:String): any =>{
    return this.getQuery(`artists/${id}`)
  };

  getTopTracks = (id:String): any =>{
    return this.getQuery(`artists/${id}/top-tracks?market=ES`)
    .pipe(map((data:any) => data.tracks));
  };
}
