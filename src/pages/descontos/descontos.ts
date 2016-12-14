import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Cards} from './../../providers/cards';
import { DescDetalhesPage  } from './../desc-detalhes/desc-detalhes';

@Component({
  selector: 'page-descontos',
  templateUrl: 'descontos.html'
})
export class DescontosPage {
  listaCards: Array<Object> = [];
  saida: string;
  loading: any;

  constructor(public navCtrl: NavController, public cards: Cards, public loadingCtrl: LoadingController) {
    //this.listaCards = [];
    //this.listarCards();
    this.loading = this.loadingCtrl.create({
          		content: 'Fetching content...'      	});

            console.log('Constructor: agora vai');
            /*
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
     }); */

     //this.listarCards();
  }

  ionViewDidLoad() {
    console.log('Pag Desconto: iniciando');
    this.listarCards();
    this.cards.atualizaMaiorId();
  }


  abrirDetalhes(objADO){
     console.log('TO CHEGANDO AQUI');
     this.navCtrl.push(DescDetalhesPage,{
       mensagem: 'Mensagem passada por NavigationTestPage', cardDetalhe: objADO
     })
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

  listarCards(){
    this.loading.present();
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
       this.loading.dismiss();
    }, (error) => {
          console.log('Error', error.err);
          //this.displayToast('Full of errors', 5000);
    });
  }


  pegaDescontos(){
    this.loading.present();
    this.cards.buscaAtualizacoes('2')
     .then( (res) => {
        let json = res.json();

        for (let i = 0; i < json.length; i++) {
            console.log('pegaDescontos: '+i+':', json[i].categoria, ' id=', json[i].id_desc, ' nome_resumo=', json[i].nome_resumo );
            this.listaCards.push(json[i]);

            this.cards.adicionar({"id_desc":json[i].id_desc,"categoria":json[i].categoria,"nome_resumo":json[i].nome_resumo,"nome_completo":json[i].nome_completo,"data_hoje":json[i].data_hoje,"validade":json[i].validade,"contato":json[i].contato,"local_cidade":json[i].local_cidade,"local_detalhes":json[i].local_detalhes,"observacoes":json[i].observacoes,"coordenadas":json[i].coordenadas,"img_card":json[i].img_card,"img_detalhes":json[i].img_detalhes});
        }

        if(res.status == 200){
          console.log('pegaDescontos: '+ res.status);
        }

        console.log(JSON.stringify(json));

        this.saida = JSON.stringify(json);
        this.loading.dismiss();
     }).catch( (err) => {
        console.log('erro: ' + err);
     });
  }


}
