import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs-routing.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage
  }
];

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['localhost:5000']
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    RouterModule.forChild(routes),
    // JwtModule.forRoot({
    //   jwtOptionsProvider: {
    //     provide: JWT_OPTIONS,
    //     useFactory: jwtOptionsFactory,
    //     deps: [Storage],
    //   }
    // }),
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
