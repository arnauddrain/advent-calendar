import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ref, Storage, getDownloadURL, uploadBytes } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private storage: Storage, private http: HttpClient) {}

  get(filename: string): Observable<any> {
    const storageRef = ref(this.storage, filename);
    return from(getDownloadURL(storageRef)).pipe(
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
    const storageRef = ref(this.storage, filename);
    await uploadBytes(storageRef, blob);
  }
}
