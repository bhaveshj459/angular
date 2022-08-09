import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-popup-text-to-speech',
  templateUrl: './popup-text-to-speech.component.html',
  styleUrls: ['./popup-text-to-speech.component.css']
})
export class PopupTextToSpeechComponent implements OnInit{
  

  text:string=''; 
  remaingText :number=58-this.text.length;
  constructor() { }
  
  ngOnInit() {
  }
  clearText() {
    this.text='';
  } 

}
