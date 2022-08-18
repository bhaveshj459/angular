import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit {
  selectAll: boolean = false;
  financial0 = false;
  financial = false;
  countP1 = 0;
  countP2 = 0;
  constructor() { }

  ngOnInit(): void {
  }
  toggleChanges() {
    this.financial = this.selectAll;
    this.financial0 = this.selectAll
    console.log(this.selectAll)
    this.calcTotalClicked();
  }

  testFunc() {
    console.log(document.getElementById("financial1_list")?.children.length)
  }

  calcTotalClicked() {
    let parentEle: any = document.getElementById("financial_list");
    this.countP1 = 0;
    this.countP2 = 0;
    for (let i = 0; i < parentEle.children.length; i++) {
      if (parentEle.children[i].children[0].checked)
        this.countP1++
    }

    let parentEle2: any = document.getElementById("financial1_list");


    for (let i = 0; i < parentEle2.children.length; i++) {
      if (parentEle2.children[i].children[0].checked)
        this.countP2++
    }
    console.log(this.countP1)
  }

}
