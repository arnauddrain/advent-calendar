import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'bypass'
})
export class BypassPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value?: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value || "<i>Le père noël n'est pas encore passé par là...</i>");
  }
}
