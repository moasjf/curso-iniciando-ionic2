import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Cards} from './../../providers/cards';
import { DescDetalhesPage  } from './../desc-detalhes/desc-detalhes';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  listaCards: Array<Object> = [];  //,  providers: [Cards]
  saida: string;
  respostas: Array<Object>;

  constructor(public navCtrl: NavController, public cards: Cards) {
    this.cards.retorna().then((data) => {
       console.log('Constructor: iniciando busca cards');
       console.log("listarCards tam: ", data.rows.length );
       this.listaCards = [];

       for(var i = 0; i < data.rows.length; i++) {
           console.log(".."+data.rows.item(i).id_desc+": "+data.rows.item(i).nome_resumo);
           this.listaCards.push({id: data.rows.item(i).id, id_desc: data.rows.item(i).id_desc, nome_resumo: data.rows.item(i).nome_resumo, categoria: data.rows.item(i).categoria});
           //di.id_desc, di.categoria, di.nome_resumo, di.nome_completo, di.data_hoje, di.validade, di.contato, di.local_cidade, di.local_detalhes, di.observacoes, di.coordenadas, di.img_card, di.img_detalhes
       }

       console.log("listaCards: ", JSON.stringify(this.listaCards) );
       //this.loading.dismiss();
    }, (error) => {
          console.log('Error', error.err);
          //this.displayToast('Full of errors', 5000);
    });
  }

  ionViewDidLoad() {
    console.log('Contact Page: iniciando');
    this.cards.atualizaMaiorId();
  }

    abrirDetalhes(objADO){
       console.log('TO CHEGANDO AQUI');
       this.navCtrl.push(DescDetalhesPage,{
         mensagem: 'Mensagem passada por NavigationTestPage', cardDetalhe: objADO
       })
    }

    listarCards(){

      console.log("listarCards : chamei a funcao" );
      this.cards.retorna().then((data) => {
         //console.log('listarPessoasDOIS saida: ',data);
         console.log("listarCards tam: ", data.rows.length );
         this.listaCards = [];

         for(var i = 0; i < data.rows.length; i++) {
             console.log(".."+data.rows.item(i).id_desc+": "+data.rows.item(i).nome_resumo);
             this.listaCards.push({id: data.rows.item(i).id, id_desc: data.rows.item(i).id_desc, nome_resumo: data.rows.item(i).nome_resumo, categoria: data.rows.item(i).categoria});
             //di.id_desc, di.categoria, di.nome_resumo, di.nome_completo, di.data_hoje, di.validade, di.contato, di.local_cidade, di.local_detalhes, di.observacoes, di.coordenadas, di.img_card, di.img_detalhes
         }

         console.log("listaCards: ", JSON.stringify(this.listaCards) );
      }, (error) => {
            console.log('Error', error.err);
            //this.displayToast('Full of errors', 5000);
      });
    }

    testePontoInicial(){
       this.cards.adicionar({"id_desc":"10","categoria":"calcados","nome_resumo":"Card Teste 1","nome_completo":"Moa Cal\u00e7ado","data_hoje":"","validade":"2015-12-25","contato":"011 1406","local_cidade":"campinas-sp","local_detalhes":"Shopping Parque Don Pedro, campinas-s","observacoes":"","coordenadas":"-22.847656, -47.06423","img_card":" ","img_detalhes":""});
       //                     di.id_desc   , di.categoria         , di.nome_resumo           , di.nome_completo                 , di.data_hoje , di.validade           , di.contato         , di.local_cidade            , di.local_detalhes                                      , di.observacoes , di.coordenadas                      , di.img_card , di.img_detalhes
    }

    testeAtualizaMaiorId(){
      this.cards.atualizaMaiorId();
      let num = this.cards.pegaMaiorId();
      this.saida = num.toString();
      //this.cards.pegaMaiorId().then();
    }

    testeRemove(idTR){
      this.cards.remover(idTR);
      this.listarCards();
    }
}
