import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './page/product-list/product-list.component';
import { ProductNewComponent } from './page/product-new/product-new.component';
import { ProductEditComponent } from './page/product-edit/product-edit.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { CustomerEditComponent } from './page/customer-edit/customer-edit.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { OrderEditComponent } from './page/order-edit/order-edit.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyDoughnutChartComponent } from './my-doughnut-chart/my-doughnut-chart.component';
import { MyRadarChartComponent } from './my-radar-chart/my-radar-chart.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';



const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductNewComponent },
  { path: 'products/update/:id', component: ProductEditComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/update/:id', component: CustomerEditComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/update/:id', component: OrderEditComponent },
  {path: 'bar-chart', component: MyBarChartComponent},
  {path: 'doughnut-chart', component: MyDoughnutChartComponent},
  {path: 'radar-chart', component: MyRadarChartComponent},
  {path: 'pie-chart', component: MyPieChartComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
