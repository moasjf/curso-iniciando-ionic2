import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, Events  } from 'ionic-angular';
import { Cards} from './../../providers/cards';
import { DescDetalhesPage  } from './../desc-detalhes/desc-detalhes';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-descontos',
  templateUrl: 'descontos.html'
})
export class DescontosPage {
  listaCards: Array<Object> = [];
  saida: string;
  loading: any;
  maiorId: number;
  flagExibeDebug: number;
  flagTemNovidade: number;

  constructor(public navCtrl: NavController, public cards: Cards, public loadingCtrl: LoadingController, public storage: Storage, platform: Platform, public events: Events ) {
      this.loading = this.loadingCtrl.create({	content: 'Carregando...'      	});
      this.flagExibeDebug = 1;
      this.flagTemNovidade = 0;

      platform.ready().then(() => {
         console.warn('desconto.ts: rodando o construtor READY ');
         this.storage.get('sessao_maiorId').then((val) => {
            if(val != null){  this.maiorId = val;                console.log('sessao_maiorId=', this.maiorId);
            }else{            this.maiorId = this.cards.maiorId; console.log('SETEI sessao_maiorId=', this.maiorId);
                              this.storage.set('sessao_maiorId',this.maiorId);
            }
         });
      });

      events.subscribe('cards:criado', (var1, var2) => {
        console.warn('desconto.ts: EVENTO cards:criado var1=', var1[0], ' var2=', var1[1]);
        this.flagTemNovidade = 1;
      });
  }

  ionViewDidLoad() {
     console.log('Pag Desconto: iniciando.. TIMEOUT inicio ');

     console.warn('descontos.ts ionViewDidLoad: ', JSON.stringify(this.listaCards) );
     this.loading.present();

     let that = this; // resolver uma questão de escopo do SetTimeout
     setTimeout(function(){             console.log("descontos.ts --------------INICIO setTimeout ");

         that.cards.atualizaQtde('normal');
         that.cards.atualizaMaiorId();

         that.cards.retorna('normal').then((data) => {
            console.warn("listarCards tam: ", data.rows.length );
            that.listaCards = [];

            for(var i = 0; i < data.rows.length; i++) {
                console.log(".."+data.rows.item(i).id_desc+": "+data.rows.item(i).nome_resumo);
                that.listaCards.push({
                     id: data.rows.item(i).id,                   id_desc: data.rows.item(i).id_desc,             nome_resumo: data.rows.item(i).nome_resumo,
                     categoria: data.rows.item(i).categoria,     nome_completo: data.rows.item(i).nome_completo, validade: data.rows.item(i).validade,
                     contato: data.rows.item(i).contato,         local_cidade: data.rows.item(i).local_cidade,   local_detalhes: data.rows.item(i).local_detalhes,
                     coordenadas: data.rows.item(i).coordenadas, observacoes: data.rows.item(i).observacoes,     img_card: data.rows.item(i).img_card,
                     img_detalhes: data.rows.item(i).img_detalhes
                    });
            }

            that.loading.dismiss();
         }, (error) => {
               console.warn('descontos.ts listarCards: Error ', error.err);
               that.loading.dismiss();
         });

         console.log('Pag Desconto: ------------ TIMEOUT FIM ');
      }, 2000);
  }

  aceitarNovidade(){
     this.flagTemNovidade = 0;
     this.listarCards();  
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
        console.log('descontos.ts ajustaMaiorId: SET sessao_maiorId='+this.maiorId);
     }else{
        console.log('descontos.ts ajustaMaiorId: sessao_maiorId='+this.maiorId);
     }
  }

  abrirDetalhes(objADO){
     console.log('TO CHEGANDO AQUI');
     this.navCtrl.push(DescDetalhesPage,{
       mensagem: 'Mensagem passada por NavigationTestPage', cardDetalhe: objADO
     })
  }

  testeAdicionar(){
     this.cards.adicionar({"id_desc":"10", "tipo":"normal","categoria":"calcados","nome_resumo":"Card Teste 1","nome_completo":"Moa Cal\u00e7ado","data_hoje":"","validade":"2015-12-25","contato":"011 1406","local_cidade":"campinas-sp","local_detalhes":"Shopping Parque Don Pedro, campinas-s","observacoes":"aqui vem um texto de observacoes","coordenadas":"-22.847656, -47.06423","img_card":" ","img_detalhes":""});
     //                     di.id_desc   , di.tipo        , di.categoria         , di.nome_resumo           , di.nome_completo                 , di.data_hoje , di.validade           , di.contato         , di.local_cidade            , di.local_detalhes                                      , di.observacoes                                   , di.coordenadas                      , di.img_card , di.img_detalhes
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
    this.loading.present();
    console.log("descontos.ts listarCards: chamei a funcao" );
    this.cards.retorna('normal').then((data) => {
       console.log("listarCards tam: ", data.rows.length );
       this.listaCards = [];

       for(var i = 0; i < data.rows.length; i++) {
           console.log(".."+data.rows.item(i).id_desc+": "+data.rows.item(i).nome_resumo);
           this.listaCards.push({
                id: data.rows.item(i).id,                   id_desc: data.rows.item(i).id_desc,             nome_resumo: data.rows.item(i).nome_resumo,
                categoria: data.rows.item(i).categoria,     nome_completo: data.rows.item(i).nome_completo, validade: data.rows.item(i).validade,
                contato: data.rows.item(i).contato,         local_cidade: data.rows.item(i).local_cidade,   local_detalhes: data.rows.item(i).local_detalhes,
                coordenadas: data.rows.item(i).coordenadas, observacoes: data.rows.item(i).observacoes,     img_card: data.rows.item(i).img_card,
                img_detalhes: data.rows.item(i).img_detalhes
               });
       }

       // console.log("listaCards: ", JSON.stringify(this.listaCards) );
       this.cards.atualizaQtde('normal');
       this.loading.dismiss();
    }, (error) => {
          console.log('descontos.ts listarCards: Error ', error.err);
          this.loading.dismiss();
    });

    this.ajustaMaiorId();
  }


  pegaDescontos(){
    this.loading.present();
    this.cards.buscaAtualizacoes('2')
     .then( (res) => {
        let json = res.json();

        for (let i = 0; i < json.length; i++) {
            console.log('pegaDescontos: '+i+':', json[i].categoria, ' id=', json[i].id_desc, ' nome_resumo=', json[i].nome_resumo );
            this.listaCards.push(json[i]);

            this.cards.adicionar({"id_desc":json[i].id_desc,"tipo":"normal","categoria":json[i].categoria,"nome_resumo":json[i].nome_resumo,"nome_completo":json[i].nome_completo,"data_hoje":json[i].data_hoje,"validade":json[i].validade,"contato":json[i].contato,"local_cidade":json[i].local_cidade,"local_detalhes":json[i].local_detalhes,"observacoes":json[i].observacoes,"coordenadas":json[i].coordenadas,"img_card":json[i].img_card,"img_detalhes":json[i].img_detalhes});
        }

        if(res.status == 200){
          console.log('pegaDescontos: '+ res.status);
        }

        console.log(JSON.stringify(json));
        this.ajustaMaiorId();
        this.saida = JSON.stringify(json);
        this.loading.dismiss();
     }).catch( (err) => {
        console.log('erro: ' + err);
     });
  }

  trocaTipo(idTT, tipoTT){
    //this.cards.aplicaTipo(idTT, tipoTT);
    console.log('descontos.ts trocaTipo: chamei ');
    this.cards.aplicaTipo(idTT, tipoTT).then((data) => {
        console.log('descontos.ts trocaTipo: idTT='+idTT+' tipoTT='+tipoTT);
        this.listarCards();
    }, (error) => {
          console.log('descontos.ts trocaTipo: Error ', error.err);
    });
  }

  exibeDebug(){
    if(this.flagExibeDebug==0){ this.flagExibeDebug = 1;
    }else{                      this.flagExibeDebug = 0; }
  }
}
