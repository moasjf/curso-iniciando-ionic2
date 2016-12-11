import { Injectable } from '@angular/core';
import { SQLite} from 'ionic-native';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseDados {
 db = new SQLite();
 people: Array<Object>;

 constructor(){
   this.db.openDatabase({
       name: "meu10conto.db",
       location: "default"
   }).then(() => {
       this.db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", {}).then((data) => {
           console.log("TABLE CREATED: ", data);
       }, (error) => {
           console.error("Unable to execute sql", error);
       })
   }, (error) => {
       console.error("Unable to open db", error);
   });
 }

 abrirBanco(){
   this.db.openDatabase({
       name: "meu10conto.db",
       location: "default"
   }).then(() => {
       this.db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", {}).then((data) => {
           console.log("TABLE CREATED: ", data);
       }, (error) => {
           console.error("Unable to execute sql", error);
       })
   }, (error) => {
       console.error("Unable to open db", error);
   });
 }

 public add(di) {
   console.log("TENTEI INSERIR: " + di.firstname + " sobrenome: "+ di.lastname);
    this.db.executeSql("INSERT INTO people (firstname, lastname) VALUES ( ?, ?)", [di.firstname,di.lastname]).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => {
        console.log("ERROR: " + JSON.stringify(error.err));
    });
 }

 public refresh() {
      this.db.executeSql("SELECT * FROM people", []).then((data) => {
          this.people = [];
          if(data.rows.length > 0) {
              for(var i = 0; i < data.rows.length; i++) {
                  this.people.push({firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname});
              }
          }
      }, (error) => {
          console.log("ERROR: " + JSON.stringify(error));
      });
 }

 public retorna(){
     return this.db.executeSql("SELECT * FROM people", []);
 }

 public limpar(){
   return this.db.executeSql("DROP TABLE people", []);
 }

}
