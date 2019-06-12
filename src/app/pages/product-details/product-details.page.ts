import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { IonSlides, Events } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { forEach } from '@angular/router/src/utils/collection';
import { Toast } from '@ionic-native/toast/ngx';
import { FunctionService } from 'src/app/api/function.service';

// import * as cheerio from 'cheerio';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})

export class ProductDetailsPage implements OnInit {
  product:any;
  @ViewChild('mySlider') slides: IonSlides;
  slider:any = [];
  hideOpts = {
    descriptions: true, content : true, order : false, orderButton : false,
  }
  quantity = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient, private storage : Storage, private events: Events,
              private toast: Toast, private funcs: FunctionService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.product = JSON.parse(params.item);
      var hola = this;
      hola.product.pictures.forEach(element => {
        console.log(element);
        hola.slider.push({title : 'toc.vn', img : 'http://139.180.135.76:2000' + element});
      });
    });
  }

  toggleDescription(){
    this.hideOpts.descriptions = !this.hideOpts.descriptions;
  }

  toggleContent(){
    this.hideOpts.content = !this.hideOpts.content;
  }

  addQuantity(){
    this.quantity ++;
  }

  subQuantity(){
    this.quantity --;
    if(this.quantity < 1){
      this.quantity = 1;
    }
  }

  addOrder(){
    this.hideOpts.orderButton = true;
    this.storage.get('orderCart').then(orderCart => {
      let abc = [];
      if(!orderCart){
        abc.push({
          post : this.product,
          quantity : this.quantity
        })
      }else{
        orderCart = JSON.parse(orderCart);
        let check = false;
        orderCart.forEach(element => {
          if(element.post._id == this.product._id){
            element.quantity += this.quantity;
            check = true;
          }
        });
        if(check == false){
          orderCart.push({
            post : this.product,
            quantity : this.quantity
          })
        }
        abc = orderCart;
      }

      this.storage.set('orderCart', JSON.stringify(abc)).then( ()=> {
        this.funcs.showToast({mes: `Đặt hàng thành công`});
        this.hideOpts.orderButton = false;
        this.events.publish('menu:setOrderCart', abc);
      });
      
    })
  }


}
