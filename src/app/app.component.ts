import { Component, Injectable } from '@angular/core';
import { PopupTextToSpeechComponent } from './popup-text-to-speech/popup-text-to-speech.component'

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }
  sortvar = 0;
  sort(sort: 1 | 0 | -1) {
    //console.log(sort);
    this.sortvar = sort;
  }

}
