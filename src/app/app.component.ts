import { Component, Injectable } from '@angular/core';


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
