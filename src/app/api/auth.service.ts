import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { callCordovaPlugin } from '@ionic-native/core/decorators/common';
import { HTTP } from '@ionic-native/http/ngx';

const TOKEN_KEY = 'access_token';
const providerId = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);
  
  //constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
  constructor( private helper: JwtHelperService, private storage: Storage, private http: HttpClient,
    private plt: Platform, private alertController: AlertController, public router : Router,
    private http_native : HTTP) {
      this.plt.ready().then(() => {
        //console.log('darrk', this.authenticationState);
        //this.checkToken(storage);
      });
  }

  checkToken(storage):Promise<boolean> {
    let http = this.http;
    let http_native = this.http_native;
    var auth = this;
    return new Promise(function(resolve, reject){
      var pm_proriderId = new Promise(function(resolve, reject) {
        storage.get('providerId').then(providerId => {
          resolve(providerId);
        });
      });
      var pm_accessToken = Promise.resolve(storage.get(TOKEN_KEY));
      var pm_authResponse = Promise.resolve(storage.get('authResponse'));
      Promise.all([pm_proriderId, pm_accessToken, pm_authResponse]).then(values => {
        console.log('auth.service check token');
        // console.log('values', values);
        if(values[0] == null){
          console.log('no providerId');
          resolve (false);
        }else{
          if(values[0] == "facebook"){
            var authResponse = JSON.parse(values[2]);
            var token = authResponse.accessToken;
            let params = new HttpParams().set('access_token', authResponse.accessToken);
            http.get('https://graph.facebook.com/me', { params: params }).subscribe((response) => {
              // console.log('call check token',response);
              auth.authenticationState.next(true);
              resolve (true);
            }, error => {
              // console.log("loi me roi", error);
              auth.logout();
              resolve (false);
            });
          }

          if(values[0] == "tocvn"){
            var authResponse = JSON.parse(values[2]);
            http_native.get(environment.host + '/api/user/check-token', {}, { access_token: authResponse.accessToken }).then((response) => {
              // console.log('response check token',response);
              auth.authenticationState.next(true);
              resolve (true);
            }, error => {
              // console.log("loi me roi", error);
              auth.logout();
              resolve (false);
            });
          }

        }
         
      
      })

    })
      
      
    
    
    // this.storage.get(TOKEN_KEY).then(token => {
    //   console.log('token', token);
    //   if (token) {
    //     let decoded = this.helper.decodeToken(token);
    //     let isExpired = this.helper.isTokenExpired(token);
 
    //     if (!isExpired) {
    //       this.user = decoded;
    //       this.authenticationState.next(true);
    //     } else {
    //       this.storage.remove(TOKEN_KEY);
    //     }
    //   }else{

    //   }
    // });

  }

  setToken(authResponse, user, providerId){
    console.log('call settoken function', authResponse, user, providerId);
    this.storage.set('authResponse', JSON.stringify(authResponse));
    this.storage.set('user', JSON.stringify(user));
    this.storage.set('providerId', providerId);
  }

  // register(credentials) {
  //   return this.http.post(`${this.url}/api/register`, credentials).pipe(
  //     catchError(e => {
  //       this.showAlert(e.error.msg);
  //       throw new Error(e);
  //     })
  //   );
  // }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  login(credentials) {
    return this.http.post(`${this.url}/api/login`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.storage.remove('authResponse');
      this.storage.remove('user');
      this.storage.remove('providerId');
    });

  }

  // getSpecialData() {
  //   return this.http.get(`${this.url}/api/special`).pipe(
  //     catchError(e => {
  //       let status = e.status;
  //       if (status === 401) {
  //         this.showAlert('You are not authorized for this!');
  //         this.logout();
  //       }
  //       throw new Error(e);
  //     })
  //   )
  // }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  ngOnInit() {
    console.log(this.helper.getTokenExpirationDate()); // date
    }


}
