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
          path: 'account',
          //canActivate: [AuthGuardService]
          children : [
            {
              path: '',
              loadChildren: './account/account.module#AccountPageModule',
            },
            {
              path: 'register',
              loadChildren:  'src/app/pages/register/register.module#RegisterPageModule' ,
              //canActivate: [AuthGuardService]
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