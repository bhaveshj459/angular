import { Component, OnInit } from '@angular/core';
import 'ace-builds';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-scss';

@Component({
  selector: 'app-comprehend',
  templateUrl: './comprehend.component.html',
  styleUrls: ['./comprehend.component.css']
})
export class ComprehendComponent implements OnInit {
  trim_value: any = document.querySelector(".ace_lin")?.innerHTML.trim();
  title = 'angular-code-editor';
  jsonInputData = '';
  jsonInputData2 = '';
  yamlInputData = '';
  appModuleTsData = '';
  scssData = '';

  input = document.getElementById("texteditor_1")?.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

    }
  });

  comprehendTextarea1: string = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and";



  constructor() { }

  ngOnInit(): void {
  }

  clearText() {
    this.comprehendTextarea1 = '';
  }
  copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

}
