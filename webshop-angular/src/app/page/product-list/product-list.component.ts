import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  list$: Observable<any> = this.ps.read();
  searchText: string = '';
  changeCounter: number = 0;

  constructor(private ps: ProductService) {
    ps.access();
  }

  ngOnInit() {
  }

  onDelete(id: number): void {
    this.ps.delete(id).forEach(data => location.reload());
  }

}
