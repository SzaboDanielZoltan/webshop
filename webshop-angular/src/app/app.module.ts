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
import { UrlPostfixValidatePipe } from './pipe/url-postfix-validate.pipe';
import { CustomerFilterPipe } from './pipe/customer-filter.pipe';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { OrderEditComponent } from './page/order-edit/order-edit.component';

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
    UrlPostfixValidatePipe,
    CustomerFilterPipe,
    SidenavComponent,
    DashboardComponent,
    OrderListComponent,
    OrderEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
