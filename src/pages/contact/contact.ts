import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Sql} from './../../providers/sql';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [Sql]
})
export class ContactPage {
  //baseDados: Sql;
  saida: string;
  respostas: Array<Object>;

  constructor(public navCtrl: NavController, public baseDados: Sql) {
    this.respostas = [];
  }

  add(){
     this.baseDados.set('1','um');
     this.baseDados.set('2','dois');
     this.baseDados.set('3','dois');
  }

  listar(){
     /* this.baseDados.getJson('1').then((data) => {
            this.saida = data;
            //if(data.rows.length > 0) {
            //    for(var i = 0; i < data.rows.length; i++) {
            //        this.people.push({firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname});
            //    }
            //}
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        }); */

      this.baseDados.query("SELECT * FROM kv  ",[]).then((data) => {
             this.saida = JSON.stringify(data);
             //console.log("SAIDA: ", data );
             console.log("RES: ", data.res );
             console.log("RES2: ", JSON.stringify(data.res.rows) );

             console.log("tam: ", data.res.rows.length );
             for(var i = 0; i < data.res.rows.length; i++) {
                 console.log(".."+data.res.rows.item(i).key+": "+data.res.rows.item(i).value);
                 //this.respostas.push({key: data.res.rows.item(i).key, value: data.res.rows.item(i).value});
                 console.log("respostas: ", JSON.stringify(this.respostas) );
                 // nao funcionou: this.respostas.push(data.res.rows.item(i));
                 this.respostas.push({key: i, value: data.res.rows.item(i).value});
             }

         }, (error) => {
             console.log("ERROR: " + JSON.stringify(error));
       });
  }
}
