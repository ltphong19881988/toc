import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../api/auth-guard.service';
import { AlertController, NavController } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { FunctionService } from '../../api/function.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  isLoggedIn = false;
  account = {};
  constructor(private auth : AuthGuardService, private alertController: AlertController, public navCtrl: NavController, private storage: Storage,
              private funcService : FunctionService) {
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

}
