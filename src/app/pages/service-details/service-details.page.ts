import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  title = '';
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.title = params.title;
        console.log(params);
    });
  }

  ngOnInit() {
  }

}
