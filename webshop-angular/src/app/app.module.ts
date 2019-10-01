import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { ProductNewComponent } from './page/product-new/product-new.component';
import { ProductEditComponent } from './page/product-edit/product-edit.component';
import { SearchFriendlyNamePipe } from './pipe/search-friendly-name.pipe';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { CustomerEditComponent } from './page/customer-edit/customer-edit.component';
import { ProductFilterPipe } from './pipe/product-filter.pipe';
import { SorterPipe } from './pipe/sorter.pipe';
import { CustomerFilterPipe } from './pipe/customer-filter.pipe';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { OrderEditComponent } from './page/order-edit/order-edit.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { MyDoughnutChartComponent } from './my-doughnut-chart/my-doughnut-chart.component';
import { MyRadarChartComponent } from './my-radar-chart/my-radar-chart.component';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductNewComponent,
    ProductEditComponent,
    SearchFriendlyNamePipe,
    CustomerListComponent,
    CustomerEditComponent,
    ProductFilterPipe,
    SorterPipe,
    CustomerFilterPipe,
    SidenavComponent,
    DashboardComponent,
    OrderListComponent,
    OrderEditComponent,
    PageNotFoundComponent,
    MyBarChartComponent,
    MyDoughnutChartComponent,
    MyRadarChartComponent,
    MyPieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

