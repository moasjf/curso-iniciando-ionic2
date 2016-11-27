import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ConnectionService} from './../../providers/connection-service/connection-service';

@Component({
  templateUrl: 'build/pages/generated-test/generated-test.html',
})
export class GeneratedTestPage {
  constructor(private nav: NavController, private connectionService: ConnectionService) {}

  buscarCep() : void {
    this.connectionService.getCep('13020060')
     .then( (res) => {
        let json = res.json();
        console.log(json);
        if(res.status == 200){
          console.log('status: '+ res.status+' localidade: '+json.localidade);
        }
     }).catch( (err) => {
        console.log('erro: ' + err);
     });
  }
}
