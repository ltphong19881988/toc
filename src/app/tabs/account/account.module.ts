import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AccountPage } from './account.page';



const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [AccountPage],
  providers:[
    Facebook,
  ]
})
export class AccountPageModule {}
