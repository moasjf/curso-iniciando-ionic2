import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Cards} from './../../providers/cards';
import { DescDetalhesPage  } from './../desc-detalhes/desc-detalhes';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-desc-estrela',
  templateUrl: 'desc-estrela.html'
})
export class DescEstrelaPage {
  listaCards: Array<Object> = [];
  saida: string;
  loading: any;
  maiorId: number;
  flagExibeDebug: number;

  constructor(public navCtrl: NavController, public cards: Cards, public loadingCtrl: LoadingController, public storage: Storage ) {
      this.loading = this.loadingCtrl.create({	content: 'Carregando...'      	});
      this.flagExibeDebug = 0;
  }

  ionViewDidLoad() {
     console.log('Pag Desconto: iniciando.. TIMEOUT agora');

     let that = this; // resolver uma questão de escopo do SetTimeout
     setTimeout(function(){             console.log("--------------INICIO setTimeou ");
         that.listarCards();
         that.cards.atualizaMaiorId();  console.log("--------------");

         that.storage.get('sessao_maiorId').then((val) => {
            if(val != null){  that.maiorId = val;                console.log('sessao_maiorId=', that.maiorId);
            }else{            that.maiorId = that.cards.maiorId; console.log('SETEI sessao_maiorId=', that.maiorId);
                              that.storage.set('sessao_maiorId',that.maiorId);
            }
         });
         that.cards.atualizaQtde('estrela');
      }, 2000);

      //this.storage.get('sessao_maiorId').then((val) => {
      //   this.maiorId = val; console.log('sessao_maiorIr=', this.maiorId);
      //});
  }

  ionViewWillEnter(){  // chamado sempre que a pessoa clica na aba
      this.listarCards();
  }

  testePegaMaiorIdCards(){
     this.saida = this.cards.maiorId.toString();
  }

  ajustaMaiorId(){
     if(this.cards.maiorId > this.maiorId ){
        this.maiorId = this.cards.maiorId;
        this.storage.set('sessao_maiorId', this.maiorId);
        console.log('desc-estrelas.ts ajustaMaiorId: SET sessao_maiorId='+this.maiorId);
     }else{
        console.log('desc-estrelas.ts ajustaMaiorId: sessao_maiorId='+this.maiorId);
     }
  }


  abrirDetalhes(objADO){
     console.log('TO CHEGANDO AQUI');
     this.navCtrl.push(DescDetalhesPage,{
       mensagem: 'Mensagem passada por NavigationTestPage', cardDetalhe: objADO
     })
  }

  testeAdicionar(){
     this.cards.adicionar({"id_desc":"10","categoria":"calcados","nome_resumo":"Card Teste 1","nome_completo":"Moa Cal\u00e7ado","data_hoje":"","validade":"2015-12-25","contato":"011 1406","local_cidade":"campinas-sp","local_detalhes":"Shopping Parque Don Pedro, campinas-s","observacoes":"aqui vem um texto de observacoes","coordenadas":"-22.847656, -47.06423","img_card":" ","img_detalhes":""});
     //                     di.id_desc   , di.categoria         , di.nome_resumo           , di.nome_completo                 , di.data_hoje , di.validade           , di.contato         , di.local_cidade            , di.local_detalhes                                      , di.observacoes                                   , di.coordenadas                      , di.img_card , di.img_detalhes
     this.listarCards();
     this.ajustaMaiorId();
  }

  testeAtualizaMaiorId(){
     this.cards.atualizaMaiorId();
     this.ajustaMaiorId();
  }

  testeRemove(idTR){
    this.cards.remover(idTR);
    this.listarCards();
  }

  listarCards(){
    //this.loading.present();
    console.log("desc-estrelas.ts listarCards: chamei a funcao" );
    this.cards.retorna('estrela').then((data) => {
       console.log("desc-estrelas.ts listarCards tam: ", data.rows.length );
       this.listaCards = [];

       for(var i = 0; i < data.rows.length; i++) {
           console.log(".."+data.rows.item(i).id_desc+": "+data.rows.item(i).nome_resumo);
           this.listaCards.push({
                id: data.rows.item(i).id,                     id_desc: data.rows.item(i).id_desc,             nome_resumo: data.rows.item(i).nome_resumo,
                categoria: data.rows.item(i).categoria,       nome_completo: data.rows.item(i).nome_completo, validade: data.rows.item(i).validade,
                contato: data.rows.item(i).contato,           local_cidade: data.rows.item(i).local_cidade,   local_detalhes: data.rows.item(i).local_detalhes,
                coordenadas: data.rows.item(i).coordenadas,   observacoes: data.rows.item(i).observacoes,     img_card: data.rows.item(i).img_card,
                img_detalhes: data.rows.item(i).img_detalhes, tipo: data.rows.item(i).tipo
               });
           //di.id_desc, di.categoria, di.nome_resumo, di.nome_completo, di.data_hoje, di.validade, di.contato, di.local_cidade,
           // di.local_detalhes, di.observacoes, di.coordenadas, di.img_card, di.img_detalhes
       }

       // console.log("listaCards: ", JSON.stringify(this.listaCards) );
       this.cards.atualizaQtde('estrela');
       //this.loading.dismiss();
    }, (error) => {
          console.log('desc-estrelas.ts listarCards: Error ', error.err);
          //this.loading.dismiss();
    });

    this.ajustaMaiorId();
  }



  trocaTipo(idTT, tipoTT){
    this.cards.aplicaTipo(idTT, tipoTT);
    this.listarCards();
  }

  exibeDebug(){
    if(this.flagExibeDebug==0){ this.flagExibeDebug = 1;
    }else{                      this.flagExibeDebug = 0; }
  }

}
