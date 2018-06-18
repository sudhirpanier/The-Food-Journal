import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { BrowserTab } from '@ionic-native/browser-tab';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html'
})
export class ArticlesPage {

  private articles = [];
  private ads = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private http: Http,
    private browserTab: BrowserTab,
    private youtube: YoutubeVideoPlayer
  ) {
    
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.http.get('http://thefoodjournal.com.sg/wp-json/wp/v2/posts?categories=1426').map(res => res.json()).subscribe(data => {
      this.ads = data;
    });
    this.http.get('http://thefoodjournal.com.sg/wp-json/wp/v2/posts?categories=7').map(res => res.json()).subscribe(data => {
      this.articles = data;
      loader.dismiss();
    });
  }

  openExternal(article) {
    if(article.type == "youtube") {
        this.youtube.openVideo('b80Jw8MuZxo');             
    } else {
        this.browserTab.openUrl(article.link);
    }
  }

  // openAd(ad) {
  //   this.browserTab.openUrl(ad.link);
  // }


}