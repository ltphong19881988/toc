import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Events, NavController } from '@ionic/angular';
import { FunctionService } from '../../api/function.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  pages = [
    {
      title: 'Trang chủ',
      url: '/',
      icon: 'home'
    },
    {
      title: 'Sản phẩm tóc',
      // url: '/products',
      icon: 'star',
      children: [
        {
          title: 'Dầu gội',
          url: '/menu/ionic',
          icon: 'logo-ionic'
        },
        {
          title: 'Kem dưỡng',
          url: '/menu/flutter',
          icon: 'logo-google'
        },
      ]
    }
  ];
  category = [];
  rootParent = "5ce6e40014a02912548dd902";
  rootCategoryType = '5ce6e3e814a02912548dd8fe';
  

  constructor(private http : HTTP, private events: Events, private funcs : FunctionService, private navCtrl : NavController) { 
    // this.events.publish('menu:setCategory', this.pages);
    console.log('click product tab');
    this.getAllCategory(this.rootCategoryType, this.rootParent);
  }

  ngOnInit() {
    
  }

  getAllCategory(idCategoryType, idParent){
    let data = {
      'idCategoryType': idCategoryType,
      'idParent': idParent,
    };
    let headers = {
        'Content-Type': 'application/json'
    };
    this.http.post('http://139.180.135.76:2000/api/category', data, headers)
    .then(data => {
      this.category = JSON.parse(data.data);
      // console.log(data.status);
      // console.log('wtf', JSON.parse(data.data)); // data received by server
      // console.log(data.headers);

    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });

  }

  goToSub(idParent, idCategoryType){
    // this.funcs.showAlert(idParent);
    let navigationExtras: NavigationExtras = {
        queryParams: {
          idParent: idParent,
          idCategoryType: idCategoryType,
        }
    };
    this.category.forEach(element => {
      // console.log('element', element);
      if(element._id == idParent){
        navigationExtras.queryParams.cate = JSON.stringify(element);
      }
    });
    this.navCtrl.navigateForward(['/sub-cate-page'], navigationExtras);
  }


}
