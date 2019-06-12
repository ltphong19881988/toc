import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';
import { FunctionService } from 'src/app/api/function.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sub-cate-page',
  templateUrl: './sub-cate-page.page.html',
  styleUrls: ['./sub-cate-page.page.scss'],
})
export class SubCatePagePage implements OnInit {
  sub:any;
  category = [];
  products = [];
  host = 'http://139.180.135.76:2000' ;

  constructor(public route: ActivatedRoute, private funcs : FunctionService, private navCtrl : NavController) { 
    this.route.queryParams.subscribe(params => {
        // console.log('params', params);
        this.sub = JSON.parse(params["cate"]);
        // console.log('sub cate', this.sub);
        let data = {
          'idCategoryType': params['idCategoryType'],
          'idParent': params['idParent'],
        };
        let headers = {
            'Content-Type': 'application/json'
        };
        var hola = this;
        this.funcs.getAllCategory(data, headers, function(result){
          result = JSON.parse(result);
          // console.log('category', result);
          hola.category = JSON.parse(result.data);
        })
        
        let cc = {
          'idCategory' : params['idParent'], postType: 1,
        }
        this.funcs.getAllProductsOfCategory(cc, headers, function(products){
          products = JSON.parse(products);
          
          hola.products = JSON.parse(products.data);
          // console.log('products ', hola.products);
        })

    });
    
    
    
  }

  ngOnInit() {
  }

  goToProductDetails(item){
    let navigationExtras: NavigationExtras = {
        queryParams: {
          item: JSON.stringify(item),
        }
    };

    this.navCtrl.navigateForward(['/product-details'], navigationExtras);
  }

}
