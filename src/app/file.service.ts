import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private storage: AngularFireStorage, private http: HttpClient) {}

  get(filename: string): Observable<any> {
    return this.storage
      .ref(filename)
      .getDownloadURL()
      .pipe(
        mergeMap((url) =>
          this.http.get(url, {
            responseType: 'text'
          })
        )
      );
  }

  async upload(filename: string, data: string): Promise<void> {
    const blob = new Blob([data], {
      type: 'text/html'
    });
    await this.storage.upload(filename, blob);
  }
}
