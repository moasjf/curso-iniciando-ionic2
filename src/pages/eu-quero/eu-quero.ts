import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-eu-quero',
  templateUrl: 'eu-quero.html'
})
export class EuQueroPage {
  saida: any;             cardDetalhe:any;
  id:any;                 id_desc:any;
  nome_resumo :any;       nome_completo :any;
  local_cidade:any;       local_detalhes:any;
  observacoes :any;       validade :string;
  flagExibeDebug: number; desconto:string;
  valCode:string;

  constructor(public navCtrl: NavController, public params : NavParams) {}

  ionViewDidLoad() {
    console.log('iniciei EuQueroPage Page');
    let card = this.params.get('cardDetalhe');
    this.flagExibeDebug = 1;                       this.desconto       = card.desconto ;
    this.id             = card.id ;                this.id_desc        = card.id_desc ;
    this.nome_resumo    = card.nome_resumo ;       this.nome_completo  = card.nome_completo ;
    this.local_cidade   = card.local_cidade ;      this.local_detalhes = card.local_detalhes ;
    this.observacoes    = card.observacoes ;       this.validade       = card.validade
    this.valCode        = card.valCode;
  }



  voltar(){
    this.navCtrl.pop();
  }

  exibeDebug(){
    if(this.flagExibeDebug==0){ this.flagExibeDebug = 1;
    }else{                      this.flagExibeDebug = 0; }
  }
}
