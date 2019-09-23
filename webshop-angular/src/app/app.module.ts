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
import { ProductFilterPipe } from './pipe/product-filter.pipe';
import { UrlPostfixValidatePipe } from './pipe/url-postfix-validate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductNewComponent,
    ProductEditComponent,
    SearchFriendlyNamePipe,
    ProductFilterPipe,
    UrlPostfixValidatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
