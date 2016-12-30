import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Cards} from './../../providers/cards';
import { DescDetalhesPage  } from './../desc-detalhes/desc-detalhes';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  listaCards: Array<Object> = [];  //,  providers: [Cards]
  saida: string;
  loading: any;
  maiorId: number;
  usuarioId: number;
  logBusca:string;
  log: Array<Object> = [];

  constructor(public navCtrl: NavController, public cards: Cards, public storage: Storage, public events: Events) {

     this.cards.retorna('todos').then((data) => {
        console.log('Constructor: iniciando busca cards');    // DEBUG
        console.log("listarCards tam: ", data.rows.length );  // DEBUG
        this.listaCards = [];
        this.log        = [];

        for(var i = 0; i < data.rows.length; i++) {
            console.log(".."+data.rows.item(i).id_desc+": "+data.rows.item(i).nome_resumo);
            this.listaCards.push({id: data.rows.item(i).id, id_desc: data.rows.item(i).id_desc, desconto: data.rows.item(i).desconto, nome_resumo: data.rows.item(i).nome_resumo, categoria: data.rows.item(i).categoria});
        }

         //console.log("listaCards: ", JSON.stringify(this.listaCards) );
         this.cards.atualizaQtde('normal');
         this.cards.atualizaQtde('estrela');
     }, (error) => {
           console.log('Error', error.err);
     });

     events.subscribe('usuario:idGerado', (varU) => {
       console.warn('contact.ts: EVENTO usuario:idGerado id=', varU[0]);
       this.usuarioId = varU[0];
     });

     this.storage.get('sessao_usuarioId').then((val) => {
        if(val != null){  this.usuarioId = val; }
        console.warn('contact.ts: PEGUEI localStorage usuarioId=', this.usuarioId);
     });

     //setInterval(this.pegaDescontos, 5000);
     setInterval(() => { this.pegaDescontos(); }, 5000);

     //this.pegaDescontos();
  }


  ionViewDidLoad() {
    console.log('Debug Page: iniciando (ionViewDidLoad)');
    this.cards.atualizaMaiorId();
    let that = this; // resolver uma questão de escopo do SetTimeout
    setTimeout(function(){             console.log("contact.ts--------------INICIO setTimeou ");
        that.storage.get('sessao_maiorId').then((val) => {
           if(val != null){  that.maiorId = val;                console.log('contact sessao_maiorId=', that.maiorId);
           }else{            that.maiorId = that.cards.maiorId; console.log('contact.ts SETEI sessao_maiorId=', that.maiorId);
                             that.storage.set('contact.ts sessao_maiorId',that.maiorId);
           }
        });
     }, 3000);

  }

  ionViewWillEnter(){  // chamado sempre que a pessoa clica na aba
      this.listarCards();
  }

  pegaDescontos(){
    console.warn('contact.ts pegaDesconto começou a rodar [usuarioId='+ this.usuarioId+']');

    let data = new Date();             let hora    = data.getHours();          // 0-23
    let min     = data.getMinutes();   let seg     = data.getSeconds();
    let agora: string;                    agora    = hora+':'+min+':'+seg;

    //this.log.push({msg: '', hora: agora, id: this.usuarioId, maiorId: this.maiorId, status: '' });

    this.cards.buscandoInternet = 1;
    this.cards.buscaAtualizacoes('2', this.usuarioId, this.maiorId)
     .then( (res) => {
        let json = res.json();

        for (let i = 0; i < json.length; i++) {
            console.log('pegaDescontos: '+i+':', json[i].categoria, ' id=', json[i].id_desc, ' nome_resumo=', json[i].nome_resumo );
            this.listaCards.push(json[i]);

            this.cards.adicionar({"id_desc":json[i].id_desc,"tipo":"normal","desconto":json[i].desconto,"categoria":json[i].categoria,"nome_resumo":json[i].nome_resumo,"nome_completo":json[i].nome_completo,"data_hoje":json[i].data_hoje,"validade":json[i].validade,"contato":json[i].contato,"local_cidade":json[i].local_cidade,"local_detalhes":json[i].local_detalhes,"observacoes":json[i].observacoes,"coordenadas":json[i].coordenadas,"img_card":json[i].img_card,"img_detalhes":json[i].img_detalhes});
        }

        if(res.status == 200){ console.log('pegaDescontos: '+ res.status); }

        console.log(JSON.stringify(json));

        this.log.push({msg: '', hora: agora, id: this.usuarioId, maiorId: this.maiorId, status: 'OK' });

        this.saida = JSON.stringify(json);
        this.cards.buscandoInternet = 0;
     }).catch( (err) => {
        console.log('erro: ' + err); //this.loading.dismiss();
        this.cards.buscandoInternet = 0;
        this.log.push({msg: '', hora: agora, id: this.usuarioId, maiorId: this.maiorId, status: 'FALHOU' });
     });
  }//fim de pegaDescontos


  abrirDetalhes(objADO){
     this.navCtrl.push(DescDetalhesPage,{ mensagem: '', cardDetalhe: objADO});
  }


  listarCards(){
    console.log("contact.ts listarCards : chamei a funcao" );
    this.cards.retorna('todos').then((data) => {
       this.listaCards = [];

       for(var i = 0; i < data.rows.length; i++) {
           console.log(".."+data.rows.item(i).id_desc+": "+data.rows.item(i).nome_resumo);
           this.listaCards.push({
                id: data.rows.item(i).id,                   id_desc: data.rows.item(i).id_desc,             nome_resumo: data.rows.item(i).nome_resumo,
                categoria: data.rows.item(i).categoria,     nome_completo: data.rows.item(i).nome_completo, validade: data.rows.item(i).validade,
                contato: data.rows.item(i).contato,         local_cidade: data.rows.item(i).local_cidade,   local_detalhes: data.rows.item(i).local_detalhes,
                coordenadas: data.rows.item(i).coordenadas, observacoes: data.rows.item(i).observacoes,     img_card: data.rows.item(i).img_card,
                desconto: data.rows.item(i).desconto,       img_detalhes: data.rows.item(i).img_detalhes
               });
       }

       //console.log("listaCards: ", JSON.stringify(this.listaCards) );
       this.cards.atualizaQtde('normal');
       this.cards.atualizaQtde('estrela');
    }, (error) => {
          console.log('Error', error.err);
    });
  }// final de listarCards


  testeAdicionar(){
    //                     di.id_desc   , di.tipo        , di.desconto    , di.categoria         , di.nome_resumo           , di.nome_completo                 , di.data_hoje , di.validade           , di.contato         , di.local_cidade            , di.local_detalhes                                      , di.observacoes                                   , di.coordenadas                      , di.img_card , di.img_detalhes
    this.cards.adicionar({"id_desc":"10", "tipo":"normal", "desconto":"33","categoria":"calcados","nome_resumo":"Card Teste 1","nome_completo":"Moa Cal\u00e7ado","data_hoje":"","validade":"2015-12-25","contato":"011 1406","local_cidade":"campinas-sp","local_detalhes":"Shopping Parque Don Pedro, campinas-s","observacoes":"aqui vem um texto de observacoes","coordenadas":"-22.847656, -47.06423","img_card":" ","img_detalhes":""});
    this.listarCards();
    this.events.publish('cards:criado', 'bla_var1', Date.now());
    console.warn('contact.ts: EVENTO cards:criado ');
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


  testeBuscaNet(){
     this.cards.buscaInternet();
  }



  apagaBanco(){
     this.cards.limpar();
     this.listaCards = [];
  }
}
