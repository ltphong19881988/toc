import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { FunctionService } from '../../api/function.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  listServices = [
    { name: 'Uốn tóc'},
    { name: 'Duối tóc'},
    { name: 'Nhuộm tóc'},
    { name: 'Nối tóc'},
    { name: 'Cắt tóc'},
    { name: 'Gội đầu'},
    { name: 'Hấp dầu'},
    { name: 'Sấy tóc'},
  ]
  constructor(private funcService : FunctionService, public navCtrl: NavController) { }

  ngOnInit() {
  }

  serviceDetails(name){
    //this.funcService.showAlert(name);
    let navigationExtras: NavigationExtras = {
        queryParams: {
          title: name,
            // refresh: refresh
        }
    };
    this.navCtrl.navigateForward(['/tabs/services/service-details'], navigationExtras);
  }

}
