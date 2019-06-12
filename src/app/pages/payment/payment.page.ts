import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { FunctionService } from 'src/app/api/function.service';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  disabledSubmit = false;
  constructor(private storage: Storage, private http: HTTP, private funcs: FunctionService, private events: Events, private router: Router) { }

  ngOnInit() {
  }

  confirmPayment(form){
    let _this = this;
    _this.disabledSubmit = true;
    var pm_promotionCode = Promise.resolve(this.storage.get('promotionCode'));
    var pm_user = Promise.resolve(this.storage.get('user'));
    var pm_orderCart = Promise.resolve(this.storage.get('orderCart'));
    Promise.all([pm_promotionCode, pm_user, pm_orderCart]).then(values => {
      console.log(values);
      let headers = {'Content-Type': 'application/json'  };
      // console.log('user', JSON.parse(values[1]));
      let data = {
        orderCart : JSON.parse(values[2]),
        paymentInfo: form.form.value,
        username: JSON.parse(values[1]).username,
        promotionCode : values[0]['code'],
      }

      
      _this.funcs.postDataToUrl(data, headers, '/api/order/add-cart', function(results){
        results = JSON.parse(results);
        _this.disabledSubmit = false;
        if(parseInt(results.status) == -1){
          _this.funcs.showToast({mes : results.error , styling : { backgroundColor: '#d33939' }}) ;
        }else{
          let abc = JSON.parse(results.data);
          if(abc.status){
            _this.funcs.showToast({mes : abc.mes}) ;
            _this.storage.remove('orderCart').then(() => {
              _this.events.publish('menu:setOrderCart', []);
              _this.router.navigateByUrl('/tabs/home');
              _this.storage.remove('promotionCode');
            });
          }else{
            _this.funcs.showToast({mes : abc.mes , styling : { backgroundColor: '#d33939' }}) ;
          }
        }
        
      })

      // this.http.post('http://139.180.135.76:2000/api/order/add-cart', data, headers)
      // .then(result => {
      // })
      // .catch(error => {
      //   this.funcs.showToast({mes : 'Có lỗi xảy ra, vui lòng thử lại sau' , styling : { backgroundColor: '#d33939' }}) ;
      // });
    })

  }


}
