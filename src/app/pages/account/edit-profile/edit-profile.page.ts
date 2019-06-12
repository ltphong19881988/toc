import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/api/function.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  account:any;
  constructor(private route: ActivatedRoute, private funcs: FunctionService) { 

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // console.log('params', params);
      if(params['account']){
        this.account = JSON.parse(params["account"]);
      }
      // console.log('sub cate', this.sub);
    });
    
  }

  submitEditProfile(){
    this.funcs.showToast({mes:'hi phong le'});
  }

}
