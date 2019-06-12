import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../api/auth-guard.service';
import { AlertController, NavController, Platform, Events } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Observable } from "rxjs";
import { FunctionService } from '../../api/function.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/api/auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  account = {};
  badge = {status: false, value: 0} ;
  promotions = [];
  constructor(private auth : AuthService, private alertController: AlertController, public navCtrl: NavController, private storage: Storage, 
              private router: Router, private events: Events,
              private funcService : FunctionService,  private platform: Platform, private af: AngularFireAuth, private facebook: Facebook) {
      storage.get('user').then((val) => {
        if(val != null){
          var authUser = JSON.parse(val);
          // console.log('authUseer ', authUser);
          storage.get("providerId").then(providerId => {
            if(providerId == "facebook"){
              authUser.avatar = authUser['picture_large']['data']['url'] ;
            }
            if(providerId == "tocvn"){
              authUser.avatar = environment.host + authUser.avatar;
            }
            this.account = authUser;
          })
        }
        
      });

  }
  


  ngOnInit() {
    this.storage.get('orderCart').then( abc => {
      if(abc){
        abc = JSON.parse(abc);
        this.badge.value = abc.length;
      }
    })
    this.events.subscribe('menu:setOrderCart', (orderCart) => {
      this.badge.value = orderCart.length;
    });
  }

  getPromotions(){

  }

  doClear(){
    this.auth.logout();
    this.router.navigate(["/"]);
  }

  editProfile(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        account: JSON.stringify(this.account),
      }
    };
    this.navCtrl.navigateForward(['/tabs/account/edit-profile'], navigationExtras);
  }
  

}
