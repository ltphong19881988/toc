import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { IonSlides } from '@ionic/angular';
import { AlertController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { File } from '@ionic-native/file/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  @ViewChild('mySlider') slides: IonSlides;
  hidden = true;
  sanphamtoc = null;
  quantity = 1;
  promotionCode = '';
  orderFixed = false;
  promotionPrice = 0;
  totalPrice = 0;
  blockItems = [
    {
      title: 'Sản phẩm',
      url: '/tabs/products',
      icon: '/assets/images/icons/products.svg',
      routerDirection : 'root',
      badge: {status: false, value: 0},
    },
    {
      title: 'Dịch vụ',
      url: '/tabs/services',
      icon: '/assets/images/icons/hair-services-f6821f.svg',
      routerDirection : 'root',
      badge: {status: false, value: 0},
    },
    {
      title: 'Video ',
      url: '/videos',
      icon: '/assets/images/icons/youtube.svg',
      routerDirection : 'forward',
      badge: {status: false, value: 0},
    },
    {
      title: 'Tóc đẹp',
      url: '/videos',
      icon: '/assets/images/icons/female-hair-shape-f6821f.svg',
      routerDirection : 'forward',
      badge: {status: false, value: 0},
    },
    {
      title: 'Tài khoản',
      url: '/tabs/account',
      icon: '/assets/images/icons/account.svg',
      routerDirection : 'forward',
      badge: {status: false, value: 0},
    },
  ];
  trustedVideoUrl: SafeResourceUrl;

  constructor(public alertCtrl: AlertController, private http: HTTP , private file: File, public navCtrl: NavController,
              private toast: Toast, private zone: NgZone, private kb: Keyboard, private domSanitizer: DomSanitizer) {
    // this.http.get('../../assets/data/sanphamtoc.json').subscribe((response) => {
    //   this.sanphamtoc = response;
    // });
  }


  slidesDidLoad() {
    this.slides.startAutoplay();
    this.slides.options = {
      speed : 1000
    };
  }

  ngOnInit() {
    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/R6XrIXbhC1I');
    console.log('trusted video', this.trustedVideoUrl);
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

  scroll(ev) {
    console.log('scroll event scrollTop', ev.detail.scrollTop);
    console.log('scroll event detail', ev.detail);
  }

  swipeEvent(ev){
    console.log('swipe event', ev);
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


  goToNotification(){
    this.navCtrl.navigateForward(['/tabs/account/notification']);
  }


}
