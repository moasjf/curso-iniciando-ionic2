import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ToolbarTestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/toolbar-test/toolbar-test.html',
})
export class ToolbarTestPage {
  public exibirBusca: any = 0;
  constructor(private nav: NavController) {}

  toogleBusca(){
    if(this.exibirBusca ==0){ this.exibirBusca = 1;
    }else{               this.exibirBusca = 0;   }
  }
}
