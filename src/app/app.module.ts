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


@NgModule({
  declarations: [
    AppComponent,
    AddToCartComponent,
    AlertComponent,
    ApplicationErrorComponent,
    PageNotFoundComponent,
    ResourceNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
