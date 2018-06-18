import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { BrowserTab } from '@ionic-native/browser-tab';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ContestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-contest',
  templateUrl: 'contest.html',
})
export class ContestPage {

   private contests = [];
   private ads = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private http: Http,
    private browserTab: BrowserTab,
  ) {
    
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.http.get('http://thefoodjournal.com.sg/wp-json/wp/v2/posts?categories=1426').map(res => res.json()).subscribe(data => {
        this.ads = data;
        this.http.get('http://thefoodjournal.com.sg/wp-json/wp/v2/posts?categories=4').map(res => res.json()).subscribe(data => {
          this.contests = data;
          loader.dismiss();
        });
      });
    
  }

  // openAd(ad) {
  //   this.browserTab.openUrl(ad.link);
  // }

   typeformTest(contest) {
    this.browserTab.openUrl("https://thefoodjournal.typeform.com/to/GCrnPS")
  }

}
