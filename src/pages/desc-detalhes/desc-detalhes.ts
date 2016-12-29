import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EuQueroPage  } from './../eu-quero/eu-quero';


@Component({
  selector: 'page-desc-detalhes',
  templateUrl: 'desc-detalhes.html'
})
export class DescDetalhesPage {
  saida: any;
  saida2: any;
  cardDetalhe:any;        id:any;
  id_desc:any;            categoria :any;
  nome_resumo :any;       nome_completo :any;
  data_hoje :any;         validade :string;
  contato :any;           local_cidade:any;
  local_detalhes:any;     observacoes :any;
  coordenadas :any;       img_card: any;
  img_detalhes: any;      desconto: string;
  flagExibeDebug: number;

  constructor(public navCtrl: NavController, public params : NavParams) {
    this.flagExibeDebug = 0;
  }


  ionViewDidLoad() {
    console.log('Iniciou DescDetalhesPage Page');
    //console.log('Parametros: ', this.params.get('mensagem'));
    let card = this.params.get('cardDetalhe');
    this.saida2         = 'id='+card.id_desc+' '+ card.nome_resumo;
    this.id             = card.id ;              this.id_desc        = card.id_desc;
    this.categoria      = card.categoria;        this.nome_resumo    = card.nome_resumo;
    this.nome_completo  = card.nome_completo;    this.data_hoje      = card.data_hoje;
    this.contato        = card.contato;          this.validade       = this.formataValidade(card.validade);
    this.local_cidade   = card.local_cidade;     this.local_detalhes = card.local_detalhes;
    this.observacoes    = card.observacoes;      this.coordenadas    = card.coordenadas;
    this.img_card       = card.img_card;         this.img_detalhes   = card.img_detalhes;
    this.desconto       = card.desconto;

    console.warn('AQUI: '+ this.formataValidade(card.validade)+ ' -->'+card.validade);
    // this.validade       = card.validade;
    //this.saida = JSON.stringify(card);  // DEBUG
    //this.saida = 'Parametros: idDesconto=' + this.params.get('cardDetalhe.id_desc');
    //this.saida = this.params.get('mensagem');
    /*
    id: data.rows.item(i).id,                   id_desc: data.rows.item(i).id_desc,             nome_resumo: data.rows.item(i).nome_resumo,
    categoria: data.rows.item(i).categoria,     nome_completo: data.rows.item(i).nome_completo, validade: data.rows.item(i).validade,
    contato: data.rows.item(i).contato,         local_cidade: data.rows.item(i).local_cidade,   local_detalhes: data.rows.item(i).local_detalhes,
    coordenadas: data.rows.item(i).coordenadas, observacoes: data.rows.item(i).observacoes,     img_card: data.rows.item(i).img_card,
    img_detalhes: data.rows.item(i).img_detalhes
    */
  }


  exibeDebug(){
    if(this.flagExibeDebug==0){ this.flagExibeDebug = 1;
    }else{                      this.flagExibeDebug = 0; }
  }


  voltar(){
    this.navCtrl.pop();
  }


  abrirEuQuero(){
     console.log('Abrindo Pagina Eu Quero');
     this.navCtrl.push(EuQueroPage,{
       mensagem: 'Mensagem passada por NavigationTestPage',
       cardDetalhe: { id:           this.id,           id_desc:        this.id_desc,
                      nome_resumo:  this.nome_resumo,  nome_completo:  this.nome_completo,
                      local_cidade: this.local_cidade, local_detalhes: this.local_detalhes,
                      observacoes:  this.observacoes,  validade:       this.validade,
                      desconto:     this.desconto,     valCode:        this.formataValidadeCod(this.validade) }
        });
  }

  formataValidade(dataFV : string){
    let temp: string;   temp = dataFV;
    let vet = temp.split('-');
     return vet[2]+'/'+vet[1]+'/'+vet[0];
  }

  formataValidadeCod(dadoFV){
    //let temp: string;   temp = this.validade;
    let vet = dadoFV.split('/');
    return vet.join('');
  }

  toggleAba(): void{
     let elements = document.querySelectorAll(".tabbar");

     if (elements != null) {
          Object.keys(elements).map((key) => {
        			  if(elements[key].style.display == 'none'){
        						      elements[key].style.display = 'flex';
        			  }else{	elements[key].style.display = 'none'; 			  }
          });
      }
  }

}
