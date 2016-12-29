import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { DescontosPage } from '../pages/descontos/descontos';
import { DescDetalhesPage } from '../pages/desc-detalhes/desc-detalhes';
import { EuQueroPage } from '../pages/eu-quero/eu-quero';
import { DescEstrelaPage } from '../pages/desc-estrela/desc-estrela';
import { Storage } from '@ionic/storage';
import { Cards } from './../providers/cards';
import { Usuario } from './../providers/usuario';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    DescontosPage,
    DescDetalhesPage,
    EuQueroPage,
    DescEstrelaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, { tabsHideOnSubPages: false })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    DescontosPage,
    DescDetalhesPage,
    EuQueroPage,
    DescEstrelaPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage,Cards,Usuario]
})
export class AppModule {}
