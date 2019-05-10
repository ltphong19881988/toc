import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
              }
            ]
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
        {
          path: 'services',
          loadChildren: './services/services.module#ServicesPageModule'
        },
        {
          path: 'account',
          loadChildren: './account/account.module#AccountPageModule',
          //canActivate: [AuthGuardService]
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