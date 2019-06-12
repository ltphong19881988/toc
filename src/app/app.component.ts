import { Component, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform, ModalController, ActionSheetController, PopoverController, MenuController, Events  } from '@ionic/angular';
import { Router, RouterOutlet } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Location } from '@angular/common';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  @ViewChild('input') myInput ;
  orderCart = [];

  public appPages = [
    {
      title: 'Trang chủ',
      url: '/tabs/home',
      icon: '/assets/images/icons/homepage-1.svg',
      routerDirection : 'root',
      badge: {status: false, value: 0},
    },
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
      title: 'Video làm đẹp',
      url: '/videos',
      icon: '/assets/images/icons/youtube.svg',
      routerDirection : 'forward',
      badge: {status: false, value: 0},
    },
    {
      title: 'Mẫu tóc đẹp',
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
    {
      title: 'Giỏ hàng',
      url: '/cart',
      icon: '/assets/images/icons/cart.svg',
      routerDirection : 'forward',
      badge: {status: true, value: 0},
    },
    // {
    //   title: 'Giỏ hàng',
    //   url: '/products',
    //   icon: 'star',
    //   children : [
    //     {
    //       title: 'feàewa',
    //       url: '/products',
    //       icon: 'star'
    //     }
    //   ]
    // }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private file: File,
    private http: HTTP,
    private storage: Storage,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private router: Router,
    private location: Location,
    private toast: Toast,
    private events: Events,
    private fcm: FCM,
  ) {
    this.initializeApp();
    
    // Initialize BackButton Eevent.
    this.backButtonEvent();

    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#1F6912');


  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('orderCart').then( abc => {
        if(abc){
          console.log('storage cart', JSON.parse(abc));
          this.orderCart = JSON.parse(abc);
          this.appPages[1].badge.value = this.orderCart.length;
        }
      })
      this.events.subscribe('menu:setOrderCart', (orderCart) => {
        this.orderCart = orderCart;
        this.appPages[1].badge.value = orderCart.length;
      });

      

      this.fcm.getToken().then(token => {
        console.log('fcm token', token);
        if(token){
          this.fcm.subscribeToTopic('all');
        }
        
      });

      this.fcm.onNotification().subscribe(data => {
        console.log('notification data', data);
        if (data.wasTapped) {
          console.log('Received in background');
          // this.router.navigate([data.landing_page, data.price]);
          this.router.navigateByUrl(data.landing_page);
        } else {
          console.log('Received in foreground');
          this.router.navigate([data.landing_page]);
          // this.router.navigate([data.landing_page, data.price]);
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log('fcm refresh token', token);
      });

      

    
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
        // close action sheet
        try {
            const element = await this.actionSheetCtrl.getTop();
            if (element) {
                element.dismiss();
                return;
            }
        } catch (error) {
        }

        // close popover
        try {
            const element = await this.popoverCtrl.getTop();
            if (element) {
                element.dismiss();
                return;
            }
        } catch (error) {
        }

        // close modal
        try {
            const element = await this.modalCtrl.getTop();
            if (element) {
                element.dismiss();
                return;
            }
        } catch (error) {
            console.log(error);

        }

        // close side menua
        try {
            const element = await this.menu.getOpen();
            if (element) {
                this.menu.close();
                return;

            }

        } catch (error) {

        }

        // this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
            let outlet = this.routerOutlets.last;
            if (outlet && outlet.canGoBack()) {
                outlet.pop();

            } 
            // else if (this.router.url === '/payment'){
              
            // } 
            // else if (this.router.url === '/cart') {
            //     this.location.back();
            // } 
            else if (this.router.url === '/tabs/home') {
              if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                  // this.platform.exitApp(); // Exit from app
                  navigator['app'].exitApp(); // work in ionic 4

              } else {
                  this.toast.show(
                      `Press back again to exit App.`,
                      '2000',
                      'center')
                      .subscribe(toast => {
                          // console.log(JSON.stringify(toast));
                      });
                  this.lastTimeBackPress = new Date().getTime();
              }
          }
        // });
    });
  }

  

}
