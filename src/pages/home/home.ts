import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {PegaDados} from './../../providers/pega-dados';
import {BaseDados} from './../../providers/base-dados';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PegaDados,BaseDados]
})
export class HomePage {

  saida: string;
  respostas: Array<Object>;

  constructor(public navCtrl: NavController, public pegaDados: PegaDados, public dados: BaseDados, public platform: Platform) {
     this.respostas = [];
     this.platform  = platform;

     platform.ready().then((readySource) => {
       console.log('Platform ready from', readySource);
       // Platform now ready, execute any required native code
       //console.log(platform.versions());
       if (this.platform.is('android')) {
         console.log("I'm an ANDROID device!");
       }
       this.dados.abrirBanco();
     });

  }

  adicionar(){
    this.dados.add({ firstname: 'nome', lastname: 'sobrenome'});
    //firstname, lastname)
    //{key: i, firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname}
    this.respostas.push({key: this.respostas.length+1, firstname: 'nome '+(this.respostas.length+1), lastname: 'sobrenome'});
  }

  apagaBanco(){
     this.dados.limpar();
     this.respostas = [];
  }

  criaBanco(){
     this.dados.abrirBanco();
     this.respostas = [];
  }


  listarPessoasDOIS(){
    this.dados.retorna().then((data) => {
       console.log('listarPessoasDOIS saida: ',data);
       console.log("listarPessoasDOIS tam: ", data.rows.length );
       this.respostas = [];

       for(var i = 0; i < data.rows.length; i++) {
           console.log(".."+data.rows.item(i).id+": "+data.rows.item(i).firstname);
           this.respostas.push({key: i, firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname});
       }

       console.log("respostas: ", JSON.stringify(this.respostas) );
    }, (error) => {
          console.log('Error', error.err);
          //this.displayToast('Full of errors', 5000);
    });
  }

  testaPegaDados() : void {
    this.pegaDados.getCep('13020060')
     .then( (res) => {
        let json = res.json();
        console.log(json);
        if(res.status == 200){
          console.log('status: '+ res.status+' localidade: '+json.localidade);
        }

        this.saida = JSON.stringify(json);
     }).catch( (err) => {
        console.log('erro: ' + err);
     });
  }

  toggleAba(): void{
     //if(document.querySelector("ion-tabbar")['style'].display == 'none'){
     //       document.querySelector("ion-tabbar")['style'].display = 'flex';
     //}else{ document.querySelector("ion-tabbar")['style'].display = 'none'; }

     let elements = document.querySelectorAll(".tabbar");

     if (elements != null) {
          Object.keys(elements).map((key) => {
        			  if(elements[key].style.display == 'none'){
        						      elements[key].style.display = 'flex';
        			  }else{	elements[key].style.display = 'none'; 			  }
          });
      }
  }
}
