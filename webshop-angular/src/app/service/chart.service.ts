import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  url: string = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient) { }
}
