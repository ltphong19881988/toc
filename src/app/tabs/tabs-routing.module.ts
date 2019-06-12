import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ServiceDetailsPage } from '../pages/service-details/service-details.page';
import { AuthGuardService } from '../api/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:
      [
        {
          path: 'home',
          children:
            [
              {
                path: '',
                loadChildren: './home/home.module#HomePageModule'
              },
              {
                path: 'product-details',
                loadChildren: 'src/app/pages/product-details/product-details.module#ProductDetailsPageModule',
                //canActivate: [AuthGuardService]
              },
            ]
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
        {
          path: 'services',
          //loadChildren: './services/services.module#ServicesPageModule',
          children : [
            {
              path: '',
              loadChildren: './services/services.module#ServicesPageModule',
            },
            {
              path: 'service-details',
              loadChildren: 'src/app/pages/service-details/service-details.module#ServiceDetailsPageModule',
              //canActivate: [AuthGuardService]
            },
          ]
        },
        {
          path: 'products',
          //loadChildren: './services/services.module#ServicesPageModule',
          children : [
            {
              path: '',
              loadChildren: './products/products.module#ProductsPageModule',
            },
            {
              path: 'product-details',
              loadChildren: 'src/app/pages/product-details/product-details.module#ProductDetailsPageModule',
              //canActivate: [AuthGuardService]
            },
          ]
        },
        {
          path: 'account',
          children : [
            {
              path: '',
              canActivate: [AuthGuardService],
              loadChildren: './account/account.module#AccountPageModule',
            },
            {
              path: 'edit-profile',
              loadChildren:  'src/app/pages/account/edit-profile/edit-profile.module#EditProfilePageModule' ,
              canActivate : [AuthGuardService]
            },
            {
              path: 'notification',
              loadChildren:  'src/app/pages/account/notification/notification.module#NotificationPageModule' ,
              canActivate : [AuthGuardService]
            },
          ]
        },
          
        ]
    },
    {
      path: '',
      redirectTo: 'tabs/home',
      pathMatch: 'full'
    },
  // { path: 'products', loadChildren: './products/products.module#ProductsPageModule' },

  // { path: 'tabs/account', loadChildren: './account/account.module#AccountPageModule', canActivate: [AuthGuardService] },

  //{ path: 'services', loadChildren: './services/services.module#ServicesPageModule' }

  ];

  @NgModule({
    imports:
      [
        RouterModule.forChild(routes)
      ],
    exports:
      [
        RouterModule
      ]
  })
  export class TabsPageRoutingModule {}