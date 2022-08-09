import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent implements OnInit {

  text:string=''; 
  remaingText :number=58-this.text.length;
  constructor() { }
  
  ngOnInit() {
  }
  clearText() {
    this.text='';
  } 

}
