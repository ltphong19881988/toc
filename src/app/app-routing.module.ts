import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './api/auth-guard.service';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'tabs',
  //   pathMatch: 'full'
  // },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'register', loadChildren: './pages/account/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './pages/account/login/login.module#LoginPageModule' },
  { path: 'sub-cate-page', loadChildren: './pages/sub-cate-page/sub-cate-page.module#SubCatePagePageModule' },
  { path: 'product-details', loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
  { path: 'payment', loadChildren: './pages/payment/payment.module#PaymentPageModule', canActivate: [AuthGuardService] },
  { path: 'sub-services', loadChildren: './pages/services/sub-services/sub-services.module#SubServicesPageModule' },
  { path: 'edit-profile', loadChildren: './pages/account/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'notification', loadChildren: './pages/account/notification/notification.module#NotificationPageModule' },
  { path: 'book-service', loadChildren: './pages/services/book-service/book-service.module#BookServicePageModule' },
  // {
  //   path: 'home',
  //   loadChildren: './home/home.module#HomePageModule'
  // },
  // {
  //   path: 'list',
  //   loadChildren: './list/list.module#ListPageModule'
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
