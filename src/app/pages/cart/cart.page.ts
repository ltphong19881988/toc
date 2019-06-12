import { Component, OnInit, NgZone  } from '@angular/core';
import { Platform, NavController, Events } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { AuthGuardService } from 'src/app/api/auth-guard.service';
import { AuthService } from 'src/app/api/auth.service';
import { Toast } from '@ionic-native/toast/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  orderCart = [];
  host = 'http://139.180.135.76:2000' ;
  isAuth = true;
  promotionCode = {code : '', type : 0, price : 0};
  orderFixed = false;
  promotionPrice = 0;
  cartPrice = 0;
  totalPrice = 0;


  constructor(private platform: Platform, private location: Location, private router: Router, private events: Events,
              private storage: Storage, private au: AuthService, private toast: Toast, private http: HTTP,
              private zone: NgZone, private kb: Keyboard, private navCtrl : NavController) { 
    
    this.initOrderCart();
    this.storage.get('promotionCode').then(promotionCode => {
      if(promotionCode){
        this.promotionCode = promotionCode;
        this.promotionCodeChange(promotionCode.code);
      }
      this.processPrice();
    })
    this.checkUserExists();
    
  }


  ngOnInit() {
    // console.log('this.router.url', this.router.url);
    window.addEventListener('keyboardDidHide', () => {
      // Describe your logic which will be run each time keyboard is closed.
      this.zone.run(() => {
        this.orderFixed = false;
      });
    });
    window.addEventListener('keyboardDidShow', (event) => {
      // Describe your logic which will be run each time when keyboard is about to be shown.
      this.zone.run(() => {
        this.orderFixed = true;
      });
    });
  }

  initOrderCart(){
    this.storage.get('orderCart').then( abc => {
      // console.log('orderCart storage', abc);
      if(abc){
        this.orderCart = JSON.parse(abc);
        this.orderCart.forEach(element => {
          element.post.postContent.content = '';
          element['price'] = element.post.normalPrice;
          if(element.post.salePrice && element.post.salePrice > 0 && element.post.salePrice < element.post.normalPrice)
            element['price'] = element.post.salePrice;
        });
        // console.log('order cart', this.orderCart);
        this.storage.set('orderCart', JSON.stringify(this.orderCart));
      }
      
    })
  }

  processPrice(){
    this.cartPrice = 0;
    this.totalPrice = 0;
    this.orderCart.forEach(element => {
      this.cartPrice += (element.price * element.quantity);
    });
    if(this.promotionCode.type == 0){
      this.promotionPrice =  this.promotionCode.price ;
    }
    if(this.promotionCode.type == 1){
      this.promotionPrice = (this.cartPrice * this.promotionCode.price)/100;
    }
    this.totalPrice = this.cartPrice - this.promotionPrice;
  }

  async checkUserExists() {
    let abc = await this.au.checkToken(this.storage);
    this.zone.run(() => {
      this.isAuth = abc;
    });
    // console.log('Exists', abc);
  }

  removeItemOfCart(item){
    // console.log('item', item);
    // console.log('index', this.orderCart.indexOf(item));
    let index = this.orderCart.indexOf(item);
    this.orderCart.splice(index, 1);
    this.storage.set('orderCart', JSON.stringify(this.orderCart));
    this.events.publish('menu:setOrderCart', this.orderCart);
  }

  subQuantity(item){
    if(item.quantity > 1){
      item.quantity --;
      this.processPrice();
      this.storage.set('orderCart', JSON.stringify(this.orderCart));
    }
    
  }

  addQuantity(item){
      item.quantity ++;
      this.processPrice();
      this.storage.set('orderCart', JSON.stringify(this.orderCart));
  }

  promotionCodeChange(code){
    if(!code) return;
    if(code.length >= 9 && code.indexOf(' ') > -1) {
      console.log('code khong hop le'); 
    } else if(code.length >= 9){
      let data = {
        'code': code,
      };
      let headers = {
          'Content-Type': 'application/json'
      };
      this.http.post('http://139.180.135.76:2000/api/order/check-code', data, headers)
      .then(data => {
        var abc = JSON.parse(data.data);
        // console.log('check promotion code', abc);
        var bg = '#d33939';
        if(abc.status)  {
          bg = '#2a7852';
          this.promotionCode = abc.code ;
        }else{
          this.promotionCode = {code : '', type : 0, price : 0};
        }
        this.storage.set('promotionCode', this.promotionCode);
        this.processPrice();
        this.storage.set('orderCart', JSON.stringify(this.orderCart));
        this.toast.showWithOptions({
          message : abc.mes,
          duration : 2000,
          position : 'center',
          styling : {backgroundColor : bg}
        })
        .subscribe(toast => {
            // console.log(JSON.stringify(toast));
        });
  
      })
      .catch(error => {
        // console.log(error.status);
        console.log(error.error); // error message as string
        // console.log(error.headers);
      });
    }
    
  }

 


}
