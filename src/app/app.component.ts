import { Component, Injectable, OnInit } from '@angular/core';


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
export class AppComponent implements OnInit {

  constructor() { }
  sortvar = 0;
  sort(sort: 1 | 0 | -1) {
    //console.log(sort);
    this.sortvar = sort;
  }

  ngOnInit(): void {
    if (window.location.hash.length > 3) {
      //window.location.href = window.location.pathname + "/";
    }

  }
}
