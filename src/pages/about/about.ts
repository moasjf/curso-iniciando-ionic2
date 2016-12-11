import { Component } from '@angular/core';
import { SQLite} from 'ionic-native';
import { Platform } from 'ionic-angular';
//import {NavController, SqlStorage, Storage} from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  database;
  platform: Platform;
  saida: string;
  //dados: BaseDados;
  pessoas: Array<Object>;

  constructor() {
   /*if (this.platform.is('cordova')) {
         this.database = (<any>window).sqlitePlugin.openDatabase({name: 'meuDesconto', location: 'default'}); //mobile
    } else {
          this.database =  (<any>window).openDatabase('meuDesconto', '1.0', 'database', -1); //debug web
    } */

     //this.database =  (<any>window).openDatabase('meuDesconto', '1.0', 'database', -1); //debug web
     this.database = (<any>window).sqlitePlugin.openDatabase({name: 'meuDesconto', location: 'default'}); //mobile
    this.database.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", {}).then((data) => {
        console.log("ABOUT TABLE CREATED: ", data);
    }, (error) => {
        console.error("ABOUT: Unable to execute sql", error);
    })
  }

  adicionar(){
    this.database.executeSql("INSERT INTO people (firstname, lastname) VALUES ('Nic', 'Raboy')", []).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => {
        console.log("ERROR: " + JSON.stringify(error.err));
    });
  }

  listarPessoas(){
    this.database.retorna().then((data) => {
       this.pessoas = data;
       this.saida = JSON.stringify(this.pessoas);
       console.log('SAIDA:', this.saida);
    }, (error) => {
          console.log('Error', error.err);
          //this.displayToast('Full of errors', 5000);
    });
  }

}
