import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Platform, Events  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Usuario {
  usuarioId: number;

  constructor(public http: Http, public storage: Storage, platform: Platform, public events: Events) {
    console.warn('Usuario Provider INICIADO');

    platform.ready().then(() => {
       console.warn('usuario: rodando o construtor READY ');
       this.storage.get('sessao_usuarioId').then((val) => {
         if(val != null){  this.usuarioId = val;                console.log('sessao_usuarioId=', this.usuarioId);
             events.publish('usuario:idGerado', this.usuarioId);
         }else{
             console.warn('usuario: indo buscar ID no servidor ');

             this.buscaIdUsuario().then( (res) => {
                 let json = res.json(); // [{"id":"07564838"}]
                 this.storage.set('sessao_usuarioId',json.id);
                 this.usuarioId = json.id;
                 console.warn('usuario: indo buscar ID no servidor ID='+json.id );
                 events.publish('usuario:idGerado', this.usuarioId);
              }).catch( (err) => {
                 console.log('usuario provider: erro: ' + err);
                 console.warn('usuario: FALHEI ao ir buscar ID no servidor=');
                 let idLocal = this.criaId();
                 this.storage.set('sessao_usuarioId',idLocal);
                 this.usuarioId = idLocal;
                 console.warn('usuario: indo buscar ID local ID='+idLocal );
                 events.publish('usuario:idGerado', this.usuarioId);
              });

          }
       });
    });

    /*events.subscribe('cards:criado', (var1, var2) => {
      console.warn('desconto.ts: EVENTO cards:criado var1=', var1[0], ' var2=', var1[1]);
      this.flagTemNovidade = 1;
    }); */

  }

  criaId(){
      let text     = "";
      let possible = "01234567890123456789012345678901234567890123456789";

      for( var i=0; i < 8; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return parseInt(text);
  }

  pegaId(){
    return this.usuarioId;
  }


  buscaIdUsuario(){
      return this.http.get('http://www.moacir.net/meu10conto/Descontos.php?acao=pegaIdUsuario').toPromise();  //[{"id":"26982420"}]
  }

}
