import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Cards} from './../providers/cards';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html',
  providers: [Cards]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, public cards: Cards) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      cards.iniciaCards();
      cards.atualizaMaiorId();
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
