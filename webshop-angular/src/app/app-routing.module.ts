import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './page/product-list/product-list.component';
import { ProductNewComponent } from './page/product-new/product-new.component';
import { ProductEditComponent } from './page/product-edit/product-edit.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { CustomerEditComponent } from './page/customer-edit/customer-edit.component';


const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'new', component: ProductNewComponent },
  { path: 'update/:id', component: ProductEditComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/update/:id', component: CustomerEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
