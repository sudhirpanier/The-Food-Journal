import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { MyApp } from './app.component';
import { BrowserTab } from '@ionic-native/browser-tab';
import { ArticlesPage } from '../pages/articles/articles';
import { PromotionsPage } from '../pages/promotions/promotions';
import { JournalPage } from '../pages/journal/journal';
import { _JournalPage } from '../pages/_journal/_journal';
import { TabsPage } from '../pages/tabs/tabs';
import { ContestPage } from '../pages/contest/contest';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    ArticlesPage,
    PromotionsPage,
    JournalPage,
    _JournalPage,
    TabsPage,
    ContestPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios', 
      platforms : {
        ios : {
          // These options are available in ionic-angular@2.0.0-beta.2 and up.
          scrollAssist: false,    // Valid options appear to be [true, false]
          autoFocusAssist: false,  // Valid options appear to be ['instant', 'delay', false]
          inputBlurring: true
        }
        // http://ionicframework.com/docs/v2/api/config/Config/)
    }}),
    Ionic2RatingModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ArticlesPage,
    PromotionsPage,
    JournalPage,
    _JournalPage,
    TabsPage,
    ContestPage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    SocialSharing,
    BrowserTab,
    Camera,
    YoutubeVideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
