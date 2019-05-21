import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders  } from '@angular/common/http';

// import * as cheerio from 'cheerio';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  title = 'San pham chi tiet';
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.title = params.title;
        console.log(params);
    });
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    //  let options = new RequestOptions({ headers:headers});
    this.http.get('https://toc.vn/san-pham/7-dieu-bat-ngo-voi-thuoc-moc-toc-mensive-malaysia/', { headers}).subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

}
