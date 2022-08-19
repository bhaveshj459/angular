import { Component, OnInit } from '@angular/core';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';

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

    var parent: any = document.getElementById("select_all");
    var c1: any = document.getElementById('parentUl');

    for (let p = 0; p < c1.children.length; p++) {

      for (let i = 0; i < c1.children[p].children[2].children.length; i++) {
        c1.children[p].children[2].children[i].children[0].checked = parent.checked;
      }
    }
    this.calcTotalClicked();

    // this.countP1 = 0;
    // this.countP2 = 0;

    this.checkParent();
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
    console.log(this.countP1);
    this.checkParent();
  }

  checkParent() {
    let parent = true;
    var c1: any = document.getElementById('parentUl');
    for (let p = 0; p < c1.children.length; p++) {
      c1.children[p].children[0].checked = true;
      for (let i = 0; i < c1.children[p].children[2].children.length; i++) {
        if (!c1.children[p].children[2].children[i].children[0].checked) {
          parent = false;
          c1.children[p].children[0].checked = false;
        }
      }
    }
    this.selectAll = parent;
    // c1.children[p].children[0].checked = children[0];
    // c1.children[1].children[0].checked = children[1];
  }

  selectAllSubParent() {
    var c1: any = document.getElementById('parentUl');
    for (let p = 0; p < c1.children.length; p++) {

      for (let i = 0; i < c1.children[p].children[2].children.length; i++) {
        c1.children[p].children[2].children[i].children[0].checked = c1.children[p].children[0].checked;
      }

    }

    this.calcTotalClicked()
  }

}
