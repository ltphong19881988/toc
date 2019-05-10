import { Component, ViewChild  } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slider = [
    {
      title : 'toc.vn',
      descriptions : 'toc dep cho ban nu',
      img : 'http://cachlamdepmoi.com/wp-content/uploads/2018/03/toc-dep-2018-800x416.jpg'
    },
    {
      title : 'sản phẩm',
      descriptions : 'san pham cham soc toc',
      img : 'https://photo-2-baomoi.zadn.vn/w1000_r1/2018_12_30_180_29185207/4626b099f4d81d8644c9.jpg'
    }
  ]
  @ViewChild('mySlider') slides: IonSlides;
  slidesDidLoad() {
    this.slides.startAutoplay();
    this.slides.options = {
      speed : 1000
    };
  }

  
}



  