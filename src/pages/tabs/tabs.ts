import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { DescontosPage } from '../descontos/descontos';
import { DescEstrelaPage } from '../desc-estrela/desc-estrela';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DescontosPage;
  tab2Root: any = DescEstrelaPage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
