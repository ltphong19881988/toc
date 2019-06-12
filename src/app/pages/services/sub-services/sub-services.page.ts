import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/api/function.service';

@Component({
  selector: 'app-sub-services',
  templateUrl: './sub-services.page.html',
  styleUrls: ['./sub-services.page.scss'],
})
export class SubServicesPage implements OnInit {
  item:any;
  category = [];
  services = [];
  constructor(private activatedRoute: ActivatedRoute, private funcs: FunctionService) { 

  }

  ngOnInit() {
    let _this = this;
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      this.item = JSON.parse(params.item);
      console.log('get item', this.item);
      let data = {
        'idCategoryType': this.item['categoryType']['_id'],
        'idParent': this.item['_id'],
      };
      let headers = {
          'Content-Type': 'application/json'
      };
      this.funcs.getAllCategory(data, headers, function(results){
        console.log('sub cate services response', JSON.parse(results));
        
      })

      let cc = {
        'idCategory' : params['_id'], postType: 1,
      }
      this.funcs.postDataToUrl(cc, headers, '/api/product', function(services){
        var abc = JSON.parse(services);
        _this.services = JSON.parse(abc.data);
        console.log('list services response',  _this.services);
      })


    });
  }



}
