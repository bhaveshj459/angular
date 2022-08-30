import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() toggleEvent = new EventEmitter();
  constructor() { }
  sort = 0;
  ngOnInit() {
  }

  toggleFuntion(int: number) {

    this.sort = int;
    this.toggleEvent.emit(this.sort);
  }

  tosearchbar() {
    document.getElementById("search")!.focus();
    document.getElementById("search")!.scrollIntoView();
  }
}
