import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../api/auth-guard.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Observable } from "rxjs";
import { FunctionService } from '../../api/function.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  isLoggedIn = false;
  account = {};
  abc;
  constructor(private auth : AuthGuardService, private alertController: AlertController, public navCtrl: NavController, private storage: Storage,
              private funcService : FunctionService,  private platform: Platform, private af: AngularFireAuth, private facebook: Facebook) {
    //this.isLoggedIn = auth.canActivate();
    
    storage.get('isLoggedIn').then((val) => {
      if(val == null){
        storage.set('isLoggedIn', JSON.stringify(false)).then((val) => {
          // console.log('result', val);
        });
      }else{
        storage.get('authUser').then((val) => {
          if(val != null){
            var authUser = JSON.parse(val);
            this.account['email'] = authUser.email; this.account['phone'] = authUser.phone; this.account['fullname'] = 'Toc vn'
            console.log('Your are ', this.account);
          }
          
        });
        this.isLoggedIn = JSON.parse(val);
      }
    });

    
    
  }

  ngOnInit() {
    
  }


  changeInfo(value, type){
    console.log('str', value, type);
    this.funcService.showAlert(value + type);
  }

  doLogin(form){
    var data = form.form.value;
    this.storage.get('authUser').then((val) => {
      if(val == null){
          this.funcService.showAlert("Vui lòng đăng ký tài khoản ."); 
          return;
      }else{
          var authUser =  JSON.parse(val);
          if(authUser.email != data.login && authUser.phone != data.login){
            this.funcService.showAlert("Email hoặc điện thoại sai .");
          }else if(authUser.password !== data.password){
            this.funcService.showAlert("Mật khẩu sai .");
          }else{
            this.storage.set('isLoggedIn', JSON.stringify(true)).then((val) => {
              this.isLoggedIn = true;
              // set info account in constructor function
            });
          }
      }
    });
  }

  doLogout(){
    this.storage.set('isLoggedIn', JSON.stringify(false)).then((val) => {
      this.isLoggedIn = false;
    });
  }

  doClear(){
    this.storage.set('isLoggedIn', JSON.stringify(false)).then((val) => {
      this.isLoggedIn = false;
    });
    this.storage.remove('authUser').then((val) => {
      console.log('clear', val);
    });
  }

  fbLogin(){
    // return Observable.create(observer => {
      if(this.platform.is('cordova')){
        this.facebook.login(['email', 'public_profile']).then((response : FacebookLoginResponse) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);
      
            firebase.auth().signInWithCredential(facebookCredential)
              .then( success => { 
                this.abc =  JSON.stringify(success);
                console.log("Firebase success: " + JSON.stringify(success)); 
              }); 
          // this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          //   this.account = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']};
        })
      }else{
         this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((observer )=>{
           this.account = {
             email : observer.user.email,
             fullname : observer.user.displayName,
             picture : observer.user.photoURL,
             phone : '98790870989',
           }
           console.log(observer);
           this.storage.set('isLoggedIn', JSON.stringify(true)).then((val) => {
            this.isLoggedIn = true;
            // set info account in constructor function
          });
          })
      }
    // })
    
    
  }

}
