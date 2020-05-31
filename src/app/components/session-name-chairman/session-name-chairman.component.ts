import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-name-chairman',
  templateUrl: './session-name-chairman.component.html',
  styleUrls: ['./session-name-chairman.component.css']
})
export class SessionNameChairmanComponent implements OnInit {
  public SessionName: string;
  public Chairman: string;
  constructor() { }

  ngOnInit() {
  }

}
