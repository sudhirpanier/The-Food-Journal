import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { BrowserTab } from '@ionic-native/browser-tab';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html'
})
export class PromotionsPage {

  private promotions = [];
  private ads = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private http: Http,
    private browserTab: BrowserTab,
  ) {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.http.get('http://thefoodjournal.com.sg/wp-json/wp/v2/posts?categories=1426').map(res => res.json()).subscribe(data => {
      this.ads = data;
    });
    this.http.get('http://thefoodjournal.com.sg/wp-json/wp/v2/posts?categories=1425').map(res => res.json()).subscribe(data => {
      this.promotions = data;
      loader.dismiss();
    });
  }

  // openAd(ad) {
  //   this.browserTab.openUrl(ad.link);
  // }
}
