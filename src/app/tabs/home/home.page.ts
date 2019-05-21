import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { IonSlides } from '@ionic/angular';
import { AlertController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slider = [
    {
      title : 'toc.vn',
      descriptions : 'toc dep cho ban nu',
      img : '/assets/images/slide1.png'
    },
    {
      title : 'sản phẩm',
      descriptions : 'san pham cham soc toc',
      img : '/assets/images/slide2.png'
    }
  ]

  sanphamtoc = null;

  constructor(public alertCtrl: AlertController, private http: HttpClient , private file: File, public navCtrl: NavController) {
    this.http.get('../../assets/data/sanphamtoc.json').subscribe((response) => {
      this.sanphamtoc = response;
    });
    // this.http.get('/src/assets/data/sanphamtoc.json', {}, {})
    // .then(data => {
    //   console.log(JSON.parse(data.data));
    // })
    // .catch(error => {
    //   console.log('dada', error);
    //   this.reqObj = error;
    // });
  }

  @ViewChild('mySlider') slides: IonSlides;

  slidesDidLoad() {
    this.slides.startAutoplay();
    this.slides.options = {
      speed : 1000
    };
  }

  async showAlert(mes) {
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: mes,
      buttons: ['OK']
    });
    await alert.present();
  }

  getRequest(){
    // this.http.get('https://toc.vn/danh-muc/san-pham-toc/', {}, {})
    // .then(data => {
    //   // let listProducts = $('box-text-products');
    //   this.reqObj = 'efafewa';
      
    // })
    // .catch(error => {
    //   this.reqObj = error;
    // });

    this.file.checkDir(this.file.dataDirectory, 'tocvn').then(_ => {
      this.showAlert('Directory exists');
    }).catch(err => {
      this.showAlert('Directory doesn\'t exists');
      this.file.createDir(this.file.dataDirectory, 'tocvn', true).then(res => {
        this.showAlert('Directory create' + res);
      }).catch(err => {
        this.showAlert('create directory error' + JSON.stringify(err));
      });
    });


  }
  

  ngOnInit() {
  }

  productDetails(link, title){
    let navigationExtras: NavigationExtras = {
        queryParams: {
          link: link,
          title : title,
            // refresh: refresh
        }
      };
    this.navCtrl.navigateForward(['/tabs/home/product-details'], navigationExtras);
  }


}
