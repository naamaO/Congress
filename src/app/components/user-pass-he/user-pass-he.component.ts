import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-pass-he',
  templateUrl: './user-pass-he.component.html',
  styleUrls: ['./user-pass-he.component.css']
})
export class UserPassHeComponent implements OnInit {

  public userDetails:FormGroup;

  constructor() { }

  ngOnInit() {
    this.userDetails=new FormGroup({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required])
    })
  }

}
