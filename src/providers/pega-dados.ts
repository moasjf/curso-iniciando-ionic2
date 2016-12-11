import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PegaDados {
  data: any;
  
  constructor(public http: Http) {
    console.log('Hello PegaDados Provider');
    this.data = null;
  }

  getCep( cep : string) : Promise <Response>{
      return this.http.get('http://viacep.com.br/ws/'+ cep.trim() +'/json/').toPromise();
  }
}
