import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private alertController: AlertController, private http : HTTP, private toast: Toast) { }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Message',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  showToast(abc){
    if(!abc.position) abc['position'] = 'center';
    if(!abc.styling) abc['styling'] = {backgroundColor : '#2a7852'} ;
    this.toast.showWithOptions({
      message : abc.mes,
      duration : 3000,
      position : abc['position'],
      styling : abc['styling'] ,
    })
    .subscribe(toast => {
        // console.log(JSON.stringify(toast));
    });
  }

  getAllCategory(data, headers, callback){
      this.http.post(environment.host + '/api/category', data, headers)
      .then(result => {
        callback( JSON.stringify(result));
      })
      .catch(error => {
        callback( JSON.stringify(error));
      });
  }

  getAllCategoryPromise (data, headers){
    let http = this.http;
    return new Promise(function(resolve, reject) {
        http.post(environment.host + '/api/category', data, headers)
        .then(result => {
          // console.log('result', result);
          resolve( (result));
        })
        .catch(error => {
          reject( (error));
        });
    });
  }

  getAllProductsOfCategory(data, headers, callback){
    this.http.post(environment.host + '/api/product', data, headers)
    .then(result => {
      callback( JSON.stringify(result));
    })
    .catch(error => {
      callback( JSON.stringify(error));
    });
  }

  postDataToUrl(data, headers, url, callback){
    this.http.post(environment.host + url, data, headers)
    .then(result => {
      callback( JSON.stringify(result));
    })
    .catch(error => {
      callback( JSON.stringify(error));
    });
  }
  

}
