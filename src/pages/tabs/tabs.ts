import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { DescontosPage } from '../descontos/descontos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DescontosPage;
  tab2Root: any = HomePage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
