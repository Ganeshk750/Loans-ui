import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserResolverService } from '../resolvers/user/user-resolver.service';
import { CategoryResolverService } from '../resolvers/category/category-resolver.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';


const routes: Routes = [
  {
    path: '',
   // canActivate: [AdminAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [AdminAuthGuard]
      },
      {
        path: 'management',
        children: [
          {
            path: 'manage-categories',
            component: ManageCategoriesComponent,
            resolve: {
              categories: CategoryResolverService
            },
           // canActivate: [AdminAuthGuard]
          },
          {
            path: 'manage-users',
            component: ManageUsersComponent,
            resolve: {
              allUsers: UserResolverService
            },
           // canActivate: [AdminAuthGuard]
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
