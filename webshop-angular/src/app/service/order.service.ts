import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = 'http://localhost:3000/api/order';

  constructor(private http: HttpClient) { }

  read(): Observable<any> {
    return this.http.get(this.url);
  }

  delete(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.url}/${id}`);
  }

  update(member, id): Observable<any> {
    return this.http.put<Order>(`${this.url}/${id}`, member)
  }
}
