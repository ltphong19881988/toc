import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { FunctionService } from '../../api/function.service';
import { HTTP } from '@ionic-native/http/ngx';


@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  listServices = [];
  rootParent = "5ce6e41014a02912548dd903";
  rootCategoryType = '5ce6e3e814a02912548dd8ff';



  constructor(private funcs : FunctionService, public navCtrl: NavController, private http: HTTP) { 
    let data = {
      'idCategoryType': this.rootCategoryType,
      'idParent': this.rootParent,
    };
    let headers = {
        'Content-Type': 'application/json'
    };
    Promise.all([this.funcs.getAllCategoryPromise(data, headers)]).then(values => {
      this.listServices = JSON.parse(values[0]['data']);
      console.log('list services', this.listServices);
    })
    
  }

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

  subServices(item){
    let navigationExtras: NavigationExtras = {
        queryParams: {
          item: JSON.stringify(item),
            // refresh: refresh
        }
    };
    this.navCtrl.navigateForward(['/sub-services'], navigationExtras);
  }

}
