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
  qtdeNormal: number = 0;
  qtdeEstrela: number = 0;
  buscandoInternet: number = 0;

  constructor(public http: Http) {
     console.log('CARDS: iniciando o provider');
     this.db.openDatabase({
         name: "meu10conto.db",
         location: "default"
     }).then(() => {
         this.db.executeSql("CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, id_desc INTEGER, tipo TEXT, categoria TEXT, nome_resumo TEXT, nome_completo TEXT, data_hoje TEXT, validade TEXT, contato TEXT, local_cidade TEXT, local_detalhes TEXT, observacoes TEXT, coordenadas TEXT, img_card TEXT, img_detalhes TEXT)", {}).then((data) => {
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
         this.db.executeSql("CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, id_desc INTEGER, tipo TEXT, categoria TEXT, nome_resumo TEXT, nome_completo TEXT, data_hoje TEXT, validade TEXT, contato TEXT, local_cidade TEXT, local_detalhes TEXT, observacoes TEXT, coordenadas TEXT, img_card TEXT, img_detalhes TEXT)", {}).then((data) => {
                          console.log("CARDS iniciaCards:   tabela CARDS criada ", data);
         }, (error) => {  console.error("CARDS iniciaCards: erro ao criar tabela CARDS", error);        })
     }, (error) => {      console.error("CARDS iniciaCards: Unable to open db", error);                       });
  }

  public atualizaMaiorId() {
       console.log("CARDS atualizaMaiorId(): tentei rodar. maiorId=" + this.maiorId);
       this.db.executeSql("SELECT MAX(id) AS ult FROM cards", []).then((data) => {
           if(data.rows.length > 0) { this.maiorId = data.rows.item(0).ult;
           }else{                     this.maiorId = 0;   }
           console.log("CARDS atualizaMaiorId(): maiorId=" + this.maiorId);
       }, (error) => {
           console.log("CARDS atualizaMaiorId(): maiorId=" + this.maiorId);
       });
  }

  public atualizaQtde( tipoAQ ) {
       console.log("CARDS atualizaQtde(): " );
       this.db.executeSql("SELECT COUNT(id) AS tot FROM cards WHERE tipo = '"+tipoAQ+"' ", []).then((data) => {
           if(tipoAQ == 'normal'){
                   if(data.rows.length > 0) { this.qtdeNormal = data.rows.item(0).tot;
                   }else{                     this.qtdeNormal = 0;   }
           }else{
                   if(data.rows.length > 0) { this.qtdeEstrela = data.rows.item(0).tot;
                   }else{                     this.qtdeEstrela = 0;   }
           }
           console.log("CARDS atualizaQtde(): qtdeNormal=" + this.qtdeNormal+ " qtdeEstrela=" + this.qtdeEstrela); // qtdeEstrela qtdeNormal
       }, (error) => {
           console.log("CARDS atualizaQtde(): erro " );
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
                     this.atualizaQtde( 'normal' );
                     this.atualizaQtde( 'estrela' );
     }, (error) => { console.log("CARDS: ERROR: " + JSON.stringify(error.err));
     });
  }

  public adicionar(di) {
    console.log("CARDS: tentei INSERIR: " + JSON.stringify(di) );
     this.db.executeSql("INSERT INTO cards (id_desc, tipo, categoria, nome_resumo, nome_completo, data_hoje, validade, contato, local_cidade, local_detalhes, observacoes, coordenadas, img_card, img_detalhes) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [di.id_desc, di.tipo, di.categoria, di.nome_resumo, di.nome_completo, di.data_hoje, di.validade, di.contato, di.local_cidade, di.local_detalhes, di.observacoes, di.coordenadas, di.img_card, di.img_detalhes]).then((data) => {
         console.log("CARDS: INSERIU: " + JSON.stringify(data));
         console.log("CARDS: INSERIU: " + data);
         this.atualizaMaiorId();
         this.atualizaQtde( 'normal' );
         this.atualizaQtde( 'estrela' );
     }, (error) => { console.log("CARDS: ERROR: " + JSON.stringify(error.err));    });
  }

  public retorna(tipoR){
      console.log("CARDS: foi chamado funcao retorna() com tipoR="+tipoR);
      let trecho:string = "";
      if(tipoR == "todos"){ trecho = "  ";                           }
      if(tipoR != "todos"){ trecho = " WHERE tipo = '"+ tipoR +"'";  }
      console.log("CARDS: foi chamado funcao retorna(): SELECT * FROM cards "+trecho+" ORDER BY id DESC " );
      return this.db.executeSql("SELECT * FROM cards "+trecho+" ORDER BY id DESC ", []);
  }

  public aplicaTipo(idAT, tipoAT){
       console.log("CARDS: foi chamado funcao aplicaTipo() ");
      return this.db.executeSql("UPDATE cards SET tipo ='"+tipoAT+"' WHERE id = "+idAT, []);
  }

  buscaAtualizacoes(qtde:string){
      return this.http.get('http://www.moacir.net/meu10conto/Descontos.php?acao=dadosDescontosJSON&categoria=calcados&ult_reg=0&local=campinas-sp').toPromise();
      //return this.http.get('http://www.moacir.net/meu10conto/Descontos.php?acao=dadosDescontosJSON&categoria=calcados&ult_reg=0&local=campinas-sp').map(res => res.json()).toPromise();
  }

  buscaInternet(){
    this.buscandoInternet = 1;
    this.buscaAtualizacoes('2')
     .then( (res) => {
        let json = res.json();

        for (let i = 0; i < json.length; i++) {
            console.log('pegaDescontos: '+i+':', json[i].categoria, ' id=', json[i].id_desc, ' nome_resumo=', json[i].nome_resumo );
            this.adicionar({"id_desc":json[i].id_desc,"categoria":json[i].categoria,"nome_resumo":json[i].nome_resumo,"nome_completo":json[i].nome_completo,"data_hoje":json[i].data_hoje,"validade":json[i].validade,"contato":json[i].contato,"local_cidade":json[i].local_cidade,"local_detalhes":json[i].local_detalhes,"observacoes":json[i].observacoes,"coordenadas":json[i].coordenadas,"img_card":json[i].img_card,"img_detalhes":json[i].img_detalhes});
        }

        console.log(JSON.stringify(json));
        this.buscandoInternet = 0;
        this.atualizaMaiorId();
        this.atualizaQtde( 'normal' );
     }).catch( (err) => {
        console.log('erro: ' + err);
        this.buscandoInternet = 0;
     });
  }

  public limpar(){
    return this.db.executeSql("DROP TABLE cards", []);
  }
}
