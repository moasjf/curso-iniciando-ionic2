import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ConnectionService} from './providers/connection-service/connection-service';
import {HomePage} from './pages/home/home';
import {MenuTestPage} from './pages/menu-test/menu-test';
import {GeneratedTestPage} from './pages/generated-test/generated-test';
import {AlertPage} from './pages/alert/alert';
import {ButtonTestPage} from './pages/button-test/button-test';
import {CardTestePage} from './pages/card-teste/card-teste';

@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
  pages: Array<{component: any, title: string, icon: string}>;
  rootPage: any = HomePage;

  constructor(platform: Platform, private menuCtrl: MenuController) {
    this.pages = [
     {component: HomePage, title: 'Home', icon: 'hand'},
     {component: MenuTestPage, title: 'Teste', icon: 'clipboard'},
     {component: GeneratedTestPage, title: 'Gerada', icon: 'cafe'},
     {component: AlertPage, title: 'Alerta', icon: 'bulb'},
     {component: ButtonTestPage, title: 'Button', icon: 'bicycle'},
     {component: CardTestePage, title: 'Card', icon: 'beer'}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  openPage(page: any, menuSide: string) : void {
     this.rootPage = page.component;
     this.menuCtrl.close(menuSide);

     console.log('lado: '+menuSide);
  }
  clicou() : void {
   console.log('clicou');

  }
}

ionicBootstrap(MyApp,[ConnectionService],{
 menuType: 'push',
 plataforms: {
  ios: {
   menuType: 'overlay'
 }}
});
