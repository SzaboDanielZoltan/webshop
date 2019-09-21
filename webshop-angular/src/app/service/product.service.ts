import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }
  access(): void {
    this.http.get(this.url).subscribe(
      data => console.log(data)
    )
  }
  read(): Observable<any> {
    return this.http.get(this.url);
  }
  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }
  create(member): Observable<any> {
    return this.http.post<Product>(this.url, member);
  }
  update(member, id): Observable<any> {
    return this.http.put<Product>(`${this.url}/${id}`, member)
  }
}
