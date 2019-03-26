import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) { }

  public downloadReport(url): Observable<any> {
    // Create url
    return this.http.get(url, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

}
