import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-desc-detalhes',
  templateUrl: 'desc-detalhes.html'
})
export class DescDetalhesPage {
  saida: any;
  saida2: any;
  cardDetalhe:any;
  id:any;
  id_desc:any;
  categoria :any;
  nome_resumo :any;
  nome_completo :any;
  data_hoje :any;
  validade :any;
  contato :any;
  local_cidade:any;
  local_detalhes:any;
  observacoes :any;
  coordenadas :any;

  constructor(public navCtrl: NavController, public params : NavParams) {}


  ionViewDidLoad() {
    console.log('Hello DescDetalhesPage Page');
    console.log('Parametros: ', this.params.get('mensagem'));

    //this.saida = 'Parametros: idDesconto=' + this.params.get('cardDetalhe.id_desc');
    this.saida = this.params.get('mensagem');

    let card = this.params.get('cardDetalhe');
    this.saida = JSON.stringify(card);

    this.saida2 = 'id='+card.id_desc+' '+ card.nome_resumo;
    //this.cardDetalhe  = this.params.get('cardDetalhe');
    //cardDetalhe
    this.id = card.id ;
    this.id_desc = card.id_desc ;
    this.categoria = card.categoria ;
    this.nome_resumo = card.nome_resumo ;
    this.nome_completo = card.nome_completo ;
    this.data_hoje = card.data_hoje ;
    this.validade = card.validade ;
    this.contato = card.contato ;
    this.local_cidade = card.local_cidade ;
    this.local_detalhes = card.local_detalhes ;
    this.observacoes = card.observacoes ;
    this.coordenadas  = card.coordenadas ;
  }

  voltar(){
    this.navCtrl.pop();
  }
}
