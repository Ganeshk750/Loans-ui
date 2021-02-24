import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ProductResolverService } from './resolvers/product/product-resolver.service';
import { CategoryResolverService } from './resolvers/category/category-resolver.service';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartResolverService } from './resolvers/cart/cart-resolver.service';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileResolverService } from './resolvers/profile/profile-resolver.service';
import { ProfileComponent } from './components/profile/profile.component';
import { UserAuthGuard } from './guards/user-auth.guard';


/* const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]; */

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolverService
    },
    canActivate: [UserAuthGuard]
  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [UserAuthGuard]

  },
  {
    path: 'cart',
    component: CartComponent,
    resolve: {
      userCart: CartResolverService
    },
    canActivate: [UserAuthGuard],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'products',
    component: ProductListComponent,
    resolve: {
      products: ProductResolverService
    }
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    resolve: {
      categories: CategoryResolverService // only if the route is: localhost:4200/categories
    }
  },
  {
    path: 'categories/:id',
    component: CategoryDetailsComponent
  },
  // { path: "notFoundResource/:status", component: ResourceNotFoundComponent },
  // { path: "applicationError/:status", component: ApplicationErrorComponent },
  {
    path: 'admin', // this is the prefix route
    // canActivate: [AdminAuthGuard],
    // lazy loading: this module will not loaded only if the the user navigate into it
    loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule)
  },
  {
    path: '**', // unknown path
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
