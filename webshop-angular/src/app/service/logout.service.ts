import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  url: string = 'http://localhost:3000/login/logout';

  read(): Observable<any> {
    return this.http.get(this.url);
  }
  constructor(private http: HttpClient) { }
}
