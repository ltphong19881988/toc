import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private events: Events) { }

  ngOnInit() {
  }

  clickProducts(){
    
  }

  ionViewWillLeave() {
    let listaFrames = document.getElementsByTagName("iframe");
 
    for (var index = 0; index < listaFrames.length; index++) {
     let iframe = listaFrames[index].contentWindow;
     iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
   }
 }


}
