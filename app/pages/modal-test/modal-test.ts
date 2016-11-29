import { Component } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';
import { ModalLoginPage } from './../modal-login/modal-login';

@Component({
  templateUrl: 'build/pages/modal-test/modal-test.html',
})
export class ModalTestPage {
  constructor(private nav: NavController) {}

  openModal() {
    let modal = Modal.create(ModalLoginPage,{
     action: {
        test: 'olá', value: true
     }
    });  // esse action é uma forma de pegar parametros de navegação
         // ai para resgatar isso a pagina precisa importar NavParams

    modal.onDismiss( (param) => {
      console.log('Dados usuario: ', param)
    } );
    this.nav.present(modal);
  }

}
