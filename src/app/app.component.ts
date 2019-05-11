import { Component, ViewChildren, QueryList } from '@angular/core';
import { IonRouterOutlet, Platform, ModalController, ActionSheetController, PopoverController, MenuController  } from '@ionic/angular';
import { Router, RouterOutlet } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Sản phẩm',
      url: '/products',
      icon: 'star',
      children : [
        {
          title: 'Thuốc mọc tóc',
          url: '/products',
          icon: 'star'
        }
      ]
    }
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
    private toast: Toast,
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

        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
            if (outlet && outlet.canGoBack()) {
                outlet.pop();

            } else if (this.router.url === '/tabs/home') {
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
        });
    });
  }

}
