import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/card-teste/card-teste.html',
})
export class CardTestePage {
  constructor(private nav: NavController, public params : NavParams) {
     console.log('Parametros: ', this.params.get('mensagem'));

  }

  voltar(){
    this.nav.pop();
  }
}
