import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './page/product-list/product-list.component';
import { ProductNewComponent } from './page/product-new/product-new.component';
import { ProductEditComponent } from './page/product-edit/product-edit.component';



const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductNewComponent },
  { path: 'products/update/:id', component: ProductEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
