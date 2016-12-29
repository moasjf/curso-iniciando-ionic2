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
  flagExibeDebug: number = 0;

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
  }

  ionViewWillEnter(){  // chamado sempre que a pessoa clica na aba
      this.listarCards();
  }


  abrirDetalhes(objADO){
     this.navCtrl.push(DescDetalhesPage,{ mensagem: '', cardDetalhe: objADO });
  }


  removeCard(idTR){
    this.cards.remover(idTR);
    this.listarCards();
  }


  listarCards(){
    //this.loading.present(); // desativado pois possue uma falha nessa versao do ionic
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
                img_detalhes: data.rows.item(i).img_detalhes, tipo: data.rows.item(i).tipo,                   desconto: data.rows.item(i).desconto
               });
       }

       // console.log("listaCards: ", JSON.stringify(this.listaCards) );
       this.cards.atualizaQtde('estrela');
       //this.loading.dismiss();
    }, (error) => {
          console.log('desc-estrelas.ts listarCards: Error ', error.err);
          //this.loading.dismiss();
    });
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
