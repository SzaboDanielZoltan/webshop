import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url: string = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient) { }
  access(): void {
    this.http.get(this.url).subscribe(
      data => console.log(data)
    );
  }
  read(): Observable<any> {
    return this.http.get(this.url);
  }
  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.url}/${id}`);
  }
  update(member, id): Observable<any> {
    return this.http.put<Customer>(`${this.url}/${id}`, member);
  }
}
