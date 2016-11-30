import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardTestePage } from './../card-teste/card-teste';

@Component({
  templateUrl: 'build/pages/navigation-test/navigation-test.html',
})
export class NavigationTestPage {
  constructor(private nav: NavController) {}

  openPage(){
    this.nav.push(CardTestePage,{
      mensagem: 'Mensagem passada por NavigationTestPage'
    });

  }
}
