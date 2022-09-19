import { Component, OnInit } from '@angular/core';
import 'ace-builds';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-scss';
import { response } from 'express';
import { VariableBinding } from '@angular/compiler';

@Component({
  selector: 'app-comprehend',
  templateUrl: './comprehend.component.html',
  styleUrls: ['./comprehend.component.css']
})
export class ComprehendComponent implements OnInit {
  users: any;
  p: number = 1;
  p1: any = {
    "entitySearchInput": 1,
    "entitySearchInputkeyphase": 1,
    "entitySearchInputPii": 1,
    "entitySearchInputPii1": 1,
    "entitySearchInputSyntax": 1
  };
  total: number = 0;

  trim_value: any = document.querySelector(".ace_lin")?.innerHTML.trim();
  title = 'angular-code-editor';

  jsonInputData = '';

  jsonResponseEntities = '';
  jsonResponseKeyPhase = '';
  jsonResponseSentiment = '';
  jsonResponseSyntax = '';
  jsonResponsePii = '';
  jsonResponseLanguage = '';

  yamlInputData = '';
  appModuleTsData = '';
  scssData = '';
  typeColor = '';

  entitySearchInput = '';
  entitySearchInputPii = '';
  entitySearchInputPii1 = '';
  entitySearchInputkeyphase = '';
  entitySearchInputSyntax = '';
  viewData: any;
  piiRadio: any = "offsets";

  loader = false;

  response: any;
  paginationArray: number[] = [];
  isPaginationWorking = false;

  input = document.getElementById("texteditor_1")?.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

    }
  });

  comprehendTextarea1: string = "Hello Zhang Wei, I am John. Your AnyCompany Financial Services, LLC credit card account 1111-0000-1111-0008 has a minimum payment of $24.53 that is due by July 31st. Based on your autopay settings, we will withdraw your payment on the due date from your bank account number XXXXXX1111 with the routing number XXXXX0000. ";



  constructor() { }

  ngOnInit(): void {

  }

  clearText() {
    this.comprehendTextarea1 = '';
    this.comprehendTextarea1.toUpperCase()
    this.response = null;
    this.entitySearchInput = '';
    this.entitySearchInputPii = '';
    this.entitySearchInputPii1 = '';
    this.entitySearchInputkeyphase = '';
    this.entitySearchInputSyntax = '';
  }

  reset() {
    this.response = null;
    this.comprehendTextarea1 = "Hello Zhang Wei, I am John. Your AnyCompany Financial Services, LLC credit card account 1111-0000-1111-0008 has a minimum payment of $24.53 that is due by July 31st. Based on your autopay settings, we will withdraw your payment on the due date from your bank account number XXXXXX1111 with the routing number XXXXX0000. ";
    this.entitySearchInput = '';
    this.entitySearchInputPii = '';
    this.entitySearchInputPii1 = '';
    this.entitySearchInputkeyphase = '';
    this.entitySearchInputSyntax = '';
  }
  copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  async analyze(text: string) {

    //console.log(this.piiRadio)
    if (this.comprehendTextarea1.length != 0) {
      this.loader = true;
      await fetch("https://l6evezpefe.execute-api.us-east-1.amazonaws.com/final/comprehend", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "text": text })
      })
        .then(response => response.json())
        .then(respdata => {
          //console.log(respdata.entities);
          this.response = respdata;
          this.viewData = this.response;
          this.response.entities.Entities = this.response.entities.Entities.map((element: any) => ({
            ...element,
            // @ts-ignore
            Score: Math.floor(element.Score * 100)
          }));
          this.response.keyPhaseResults.KeyPhrases = this.response.keyPhaseResults.KeyPhrases.map((element: any) => ({
            ...element,
            // @ts-ignore
            Score: Math.floor(element.Score * 100)
          }));
          this.response.languageResults.Languages = this.response.languageResults.Languages.map((element: any) => ({
            ...element,
            // @ts-ignore
            Score: Math.floor(element.Score * 100),
            LanguageCode: this.getLanguage(element.LanguageCode)
          }));
          this.response.piiEntitiesResults.Entities = this.response.piiEntitiesResults.Entities.map((element: any) => ({
            ...element,
            // @ts-ignore
            Score: Math.floor(element.Score * 100)
          }));
          // this.response.sentiment.SentimentScore.Positive = (Number.parseFloat(this.response.sentiment.SentimentScore.Positive)).toFixed(2);
          // this.response.sentiment.SentimentScore.Negative = this.response.sentiment.SentimentScore.Negative.toFixed(2);
          // this.response.sentiment.SentimentScore.Neutral = this.response.sentiment.SentimentScore.Neutral.toFixed(2);
          // this.response.sentiment.SentimentScore.Mixed = this.response.sentiment.SentimentScore.Mixed.toFixed(2);

          //console.log("rep" + this.response.entities)
          this.jsonInputData = `{
  "Text" : ` + text + `
}`;
          this.jsonResponseEntities = JSON.stringify(respdata.entities, null, 2);
          this.jsonResponseKeyPhase = JSON.stringify(respdata.keyPhaseResults, null, 2);
          this.jsonResponseSentiment = JSON.stringify(respdata.sentiment, null, 2);
          this.jsonResponseSyntax = JSON.stringify(respdata.syntaxResults, null, 2);
          this.jsonResponsePii = JSON.stringify(respdata.piiEntitiesResults, null, 2);
          this.jsonResponseLanguage = JSON.stringify(respdata.languageResults, null, 2);


          this.loader = false;

        })

        .catch(err => {
          //console.log(err);
          this.loader = false;
        })
    }
  }

  IsEntity(str: string, val: any): string {
    var result = '';
    // @ts-ignore: *
    val.forEach(element => {

      if ((element.Text.includes(str)) && (str.length > 1)) {
        if (element.Type) {
          this.typeColor = '';
          this.typeColor = this.setColor(element.Type);
          result = element.Type;
        }
        else {
          result = element.Text
        }
      }
    });
    return result
  }

  setColor(type: string) {
    //debugger;
    if (type.toLowerCase().includes("person")) {
      return "#FA6400";
    }
    else if (type.toLowerCase().includes("organization")) {
      return "#0091FF";
    }
    else if (type.toLowerCase().includes("other")) {
      return "#77FF00";
    }
    else if (type.toLowerCase().includes("quantity")) {
      return "#FF0000";
    }
    else if (type.toLowerCase().includes("date")) {
      return "#6439FD";
    }
    else if (type.toLowerCase().includes("keyphase")) {
      return "#007dbc";
    }
    else {
      return "null";
    }

  }

  search(entitySearchInput: string) { };

  // search(entitySearchInput: string) {
  //   if (entitySearchInput.length >= 1) {
  //     // @ts-ignore
  //     let filterArray = this.viewData.entities.Entities.filter(data => data.Text.toLowerCase().includes(entitySearchInput.toLowerCase()) || data.Type.toLowerCase().includes(entitySearchInput.toLowerCase()) || data.Score === parseInt(entitySearchInput));
  //     this.viewData.entities.Entities = filterArray;

  //   }
  //   else {
  //     this.viewData.entities.Entities = this.response.entities.Entities;
  //   }

  //   //console.log("this is herer " + this.response.entities.Entities.length)
  // }
  searchPii(entitySearchInput: string) {
    if (entitySearchInput.length >= 1) {
      //debugger;
      // @ts-ignore
      let filterArray = this.viewData.piiEntitiesResults.Entities.filter(data => data.Type.toLowerCase().includes(entitySearchInput.toLowerCase()) || data.Score == parseInt(entitySearchInput));
      this.viewData.piiEntitiesResults.Entities = filterArray;

    }
    else {
      this.viewData = this.response;
    }

    //console.log("this is herer " + this.response.piiEntitiesResults.Entities.length)
  }

  getLanguage(code: string) {
    if (code == 'en') {
      return 'English, en'
    }
    else
      return 'unknown code' + code;
  }

  roundoff(num: number, conv?: string) {
    return num.toFixed(2)
  }

  getSyntax(code: string) {
    switch (code) {
      case "INTJ":
        return 'Interjection'
      case 'PROPN':
        return 'Proper noun'
      case 'PUNCT':
        return 'Punctuation'
      case 'ADP':
        return 'Adposition'
      case 'AUX':
        return 'Auxiliary verb'
      case 'PRON':
        return 'Pronoun'
      case 'VERB':
        return 'Verb'
      case 'NOUN':
        return 'Noun'
      case 'NUM':
        return 'Numeral'
      case 'DET':
        return 'Determiner'
      case 'ADJ':
        return 'Adjective'
      default:
        return code

    }

  }

  // len: any;
  // getUsers(data: any) {
  //   this.users = data;
  //   this.len = data.length;
  //   this.total = this.len;
  // }
  // getUsers1(data: any) {
  //   this.users = data;
  //   this.len = data.length;
  //   this.total = this.len;
  // }

  // pageChangeEvent(event: number, data: any, val: string) {
  //   this.p = event;
  //   this.users = data;
  //   this.len = data.length;
  //   this.total = this.len;
  // }
  // p2: number = 1;
  // users1: any;
  // total2: number = 0;
  // pageChangeEvent1(event: number) {
  //   this.p2 = event;
  //   this.users1 = this.viewData.piiEntitiesResults.Entities;
  //   this.len = this.users1.length;
  //   this.total2 = this.len;
  // }

  // pagination(data: any, view: any[], postion: number) {
  //   //console.log(this.viewData.view)
  //   let noOfPage = data.length / 6;
  //   this.paginationArray = [];
  //   view = [];
  //   for (let index = 0; index < noOfPage; index++) {

  //     this.paginationArray.push(index + 1)

  //     for (let index = ((postion - 1) * 6); index < ((postion * 6) - 1); index++) {
  //       // debugger
  //       view.push(data[index]);
  //     }
  //   }
  //   //this.viewData.entities.Entities = view;
  // }

}
