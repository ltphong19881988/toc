import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuardService } from '../../../api/auth-guard.service';
import { AuthService } from '../../../api/auth.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Observable } from "rxjs";
import { FunctionService } from '../../../api/function.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  returnUrl: string;
  isLoggedIn = false;
  account : any = {};
  abc;
  constructor(private authGuard : AuthGuardService, private authService: AuthService, private alertController: AlertController, 
              public navCtrl: NavController, private storage: Storage, private route: ActivatedRoute, private router: Router,
              private funcs : FunctionService,  private platform: Platform, private af: AngularFireAuth, private facebook: Facebook,
              private http: HTTP) { 

  }

  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('hi', location.host);
    console.log('return url', this.returnUrl);
  }

  doLogin(form){
    var data = form.form.value;
    console.log('data post', data);
    let headers = {
      'Content-Type': 'application/json'
    }
    this.http.post('http://139.180.135.76:2000/api/user/login', data, headers)
    .then(result => {
      let abc = JSON.parse(result.data);
      // console.log('login response', abc);
      this.funcs.showAlert(abc.mes);
      if(abc.status){
        let authResponse = {accessToken : abc.token};
        this.account = abc.user ;
        this.authService.setToken(authResponse, abc.user, 'tocvn');
        this.router.navigateByUrl(this.returnUrl);
      }else{
        
      }
    })
    .catch(error => {
      // callback( JSON.stringify(error));
    });

  }

  fbLogin(){
    console.log('do login fb');
    // return Observable.create(observer => {
      if(this.platform.is('cordova')){
        this.facebook.login(['email', 'public_profile']).then((response : FacebookLoginResponse) => {
          // const facebookCredential = firebase.auth.FacebookAuthProvider
          //     .credential(response.authResponse.accessToken);
      
          //   firebase.auth().signInWithCredential(facebookCredential)
          //     .then( success => { 
          //       this.abc =  JSON.stringify(success);
          //       console.log("Firebase success: " , (success)); 
          //     }); 
          console.log('response', response);
          if(response.status == "connected"){
            this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
              console.log('profile', profile);
              profile['username'] = profile['id'];
              this.account = {email: profile['email'], first_name: profile['first_name'], avatar: profile['picture_large']['data']['url'], username: profile['id']};

              let authUser = {
                email : profile['email'],
                username : profile['id'],
                phone : profile['phone'],
                first_name : profile['first_name'],
                last_name : profile['last_name'],
                password : 'tocvn@123456',
                facebook : {profile : profile, authResponse: response.authResponse}
              }
              let headers = {
                'Content-Type': 'application/json'
              }
              this.http.post('http://139.180.135.76:2000/api/user/add-user', {user : authUser, providerId : 'facebook'}, headers)
              .then(result => {
                let abc = JSON.parse(result.data);
                console.log('create fb user');
              })
              .catch(error => {
                // callback( JSON.stringify(error));
              });
              
              this.authService.setToken(response.authResponse, profile, 'facebook');
              this.router.navigateByUrl(this.returnUrl);
            })
          }else{

          }
          
          
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
