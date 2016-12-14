import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SQLite} from 'ionic-native';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class Cards {
  db = new SQLite();
  maiorId: number = 0;
  msg: string = 'o provider está visivel aqui';

  constructor(public http: Http) {
     console.log('CARDS: iniciando o provider');
     this.db.openDatabase({
         name: "meu10conto.db",
         location: "default"
     }).then(() => {
         this.db.executeSql("CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, id_desc INTEGER, categoria TEXT, nome_resumo TEXT, nome_completo TEXT, data_hoje TEXT, validade TEXT, contato TEXT, local_cidade TEXT, local_detalhes TEXT, observacoes TEXT, coordenadas TEXT, img_card TEXT, img_detalhes TEXT)", {}).then((data) => {
                          console.log("CARS: tabela CARDS criada ", data);
         }, (error) => {  console.error("CARS: erro ao criar tabela CARDS", error);        })
     }, (error) => {      console.error("Unable to open db", error);                       });
  }

  iniciaCards(){
     console.log("CARDS iniciaCards()");
     this.db.openDatabase({
         name: "meu10conto.db",
         location: "default"
     }).then(() => {
         this.db.executeSql("CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, id_desc INTEGER, categoria TEXT, nome_resumo TEXT, nome_completo TEXT, data_hoje TEXT, validade TEXT, contato TEXT, local_cidade TEXT, local_detalhes TEXT, observacoes TEXT, coordenadas TEXT, img_card TEXT, img_detalhes TEXT)", {}).then((data) => {
                          console.log("CARS: tabela CARDS criada ", data);
         }, (error) => {  console.error("CARS: erro ao criar tabela CARDS", error);        })
     }, (error) => {      console.error("Unable to open db", error);                       });
  }

  public atualizaMaiorId() {
       console.log("CARDS atualizaMaiorId(): tentei rodar. maiorId=" + this.maiorId);
       //this.db.executeSql("SELECT MAX(id_desc) AS ult FROM cards", []).then((data) => {
       this.db.executeSql("SELECT MAX(id) AS ult FROM cards", []).then((data) => {
           if(data.rows.length > 0) { this.maiorId = data.rows.item(0).ult;
           }else{                     this.maiorId = 0;   }
           console.log("CARDS atualizaMaiorId(): maiorId=" + this.maiorId);
       }, (error) => {
           console.log("CARDS atualizaMaiorId(): maiorId=" + this.maiorId);
       });
  }

  pegaMaiorId(){
     return this.maiorId;
  }

  public remover(idR) {
    console.log("CARDS: tentei REMOVER: " + idR );
     this.db.executeSql("DELETE FROM cards WHERE id = ? ", [idR]).then((data) => {
                     console.log("CARDS: REMOVI: "  + idR);
                     this.atualizaMaiorId();
     }, (error) => { console.log("CARDS: ERROR: " + JSON.stringify(error.err));
     });
  }

  public adicionar(di) {
    console.log("CARDS: tentei INSERIR: " + JSON.stringify(di) );
     this.db.executeSql("INSERT INTO cards (id_desc, categoria, nome_resumo, nome_completo, data_hoje, validade, contato, local_cidade, local_detalhes, observacoes, coordenadas, img_card, img_detalhes) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?)", [di.id_desc, di.categoria, di.nome_resumo, di.nome_completo, di.data_hoje, di.validade, di.contato, di.local_cidade, di.local_detalhes, di.observacoes, di.coordenadas, di.img_card, di.img_detalhes]).then((data) => {
         console.log("CARDS: INSERIU: " + JSON.stringify(data));
         this.atualizaMaiorId();
     }, (error) => {
         console.log("CARDS: ERROR: " + JSON.stringify(error.err));
     });
  }

  public retorna(){
       console.log("CARDS: foi chamado funcao retorna() ");
      return this.db.executeSql("SELECT * FROM cards", []);
  }

  buscaAtualizacoes(qtde:string){
      return this.http.get('http://www.moacir.net/meu10conto/Descontos.php?acao=dadosDescontosJSON&categoria=calcados&ult_reg=0&local=campinas-sp').toPromise();
      //return this.http.get('http://www.moacir.net/meu10conto/Descontos.php?acao=dadosDescontosJSON&categoria=calcados&ult_reg=0&local=campinas-sp').map(res => res.json()).toPromise();
  }

  public limpar(){
    return this.db.executeSql("DROP TABLE cards", []);
  }
}
