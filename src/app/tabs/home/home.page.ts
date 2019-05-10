import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
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

  reqObj = null;

  constructor(public alertCtrl: AlertController, private http: HTTP, private file: File) {}

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

    // this.file.writeFile(this.file.externalDataDirectory , 'dark/test.json', 'hello,world,', {replace: true}).then(_ => {
    //   this.showAlert('Directory exists');
    //   console.log('Directory exists');
    // }).catch(err => {
    //   this.showAlert('Directory doesn\'t exists');
    //   console.log('Directory doesn\'t exist')
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

}
