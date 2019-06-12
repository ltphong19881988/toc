import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubCatePagePage } from './sub-cate-page.page';

const routes: Routes = [
  {
    path: '',
    component: SubCatePagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RouterModule.forChild(routes)
  ],
  declarations: [SubCatePagePage]
})
export class SubCatePagePageModule {}
