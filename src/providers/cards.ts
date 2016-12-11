import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class Cards {

  constructor(public http: Http) {
    console.log('CARDS: iniciando o provider');
  }

  getCep( cep : string) : Promise <Response>{
      return this.http.get('http://viacep.com.br/ws/'+ cep.trim() +'/json/').toPromise();
  }

  buscaAtualizacoes(qtde:string){
      return this.http.get('http://www.moacir.net/meu10conto/Descontos.php?acao=dadosDescontosJSON&categoria=calcados&ult_reg=0&local=campinas-sp').toPromise();
      //return this.http.get('http://www.moacir.net/meu10conto/Descontos.php?acao=dadosDescontosJSON&categoria=calcados&ult_reg=0&local=campinas-sp').map(res => res.json()).toPromise();

      //this.http.get('location/of/data').map(res => res.json()).subscribe(data => {    console.log(data); });
  }
}
