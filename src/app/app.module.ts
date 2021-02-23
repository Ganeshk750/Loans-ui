import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddToCartComponent } from './shared/components/add-to-cart/add-to-cart.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { ApplicationErrorComponent } from './shared/components/application-error/application-error.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ResourceNotFoundComponent } from './shared/components/resource-not-found/resource-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NgxModule } from './shared/ngx/ngx.module';
import { AdminModule } from './admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilesModule } from './shared/files/files.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    AddToCartComponent,
    AlertComponent,
    ApplicationErrorComponent,
    PageNotFoundComponent,
    ResourceNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    MaterialModule,
    NgxModule,
    FormsModule,
    ReactiveFormsModule,
    FilesModule,
    HttpClientModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
