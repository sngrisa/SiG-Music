import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro',
})
export class DomseguroPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string): SafeUrl {
    const url = 'https://open.spotify.com/embed/track/';
    let uri = value.slice(22);
    console.log(uri);
    let urlToSanitize = url + uri;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(urlToSanitize);
  }
}
