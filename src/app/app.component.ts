import { Component } from '@angular/core';
import { RealExchangeService } from './services/real-exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-project';

  constructor(private _realExchangeService: RealExchangeService) {
    this._realExchangeService.getExchangeValues();
  }

  //bootstrap(App, [SocketService]);
}
