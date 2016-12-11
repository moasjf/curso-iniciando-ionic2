import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Cards} from './../../providers/cards';

@Component({
  selector: 'page-descontos',
  templateUrl: 'descontos.html',
  providers: [Cards]
})
export class DescontosPage {
  listaCards: Array<Object>;
  saida: string;

  constructor(public navCtrl: NavController, public cards: Cards) {  this.listaCards = []; }

  ionViewDidLoad() {
    console.log('Pag Desconto: iniciando');
  }

  pegaDescontos(){
    this.cards.buscaAtualizacoes('2')
     .then( (res) => {
        let json = res.json();

        for (let i = 0; i < json.length; i++) {
            console.log('pegaDescontos: '+i+':', json[i].categoria, ' id=', json[i].id_desc, ' nome_resumo=', json[i].nome_resumo );
            this.listaCards.push(json[i]);
        }

        if(res.status == 200){
          console.log('pegaDescontos: '+ res.status);
        }

        console.log(JSON.stringify(json));

        this.saida = JSON.stringify(json);
     }).catch( (err) => {
        console.log('erro: ' + err);
     });
  }


}
