import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent implements OnInit {
  //mensagem de erro de login
  @Output()
      showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
      _show = false;

  constructor() { }

  ngOnInit() {
  }
    //mensagem de erro de login
  @Input()
  set show(value){
    this._show = value;
    this.showChange.emit(value);
  }
//esconde mensagem de erro de login
  hide(){
    this.show = false;
  }

}
//modo correto de chamar evento OUTPUT [(nome do evento)]