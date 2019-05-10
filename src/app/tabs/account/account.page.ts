import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../api/auth-guard.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  isLoggedIn = false;
  account = {email : 'test@gmail.com', phone : '0985344672', fullname : 'Phong Le'};
  constructor(private auth : AuthGuardService, private alertController: AlertController, public navCtrl: NavController) {
    //this.isLoggedIn = auth.canActivate();
    this.isLoggedIn = true;
  }

  ngOnInit() {
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  changeInfo(value, type){
    console.log('str', value, type);
    this.showAlert(value + type);
  }

}
