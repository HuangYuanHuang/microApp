import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '抽查准备',
      message: '收到抽查任务是否准备?',
      buttons: [
      
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Buy clicked');
          }
        },
        {
          text: '确定',  
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ]
    });
    alert.present();
  }

}
