import { Component, OnInit } from '@angular/core';
import 'ace-builds';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-scss';
import { response } from 'express';

@Component({
  selector: 'app-comprehend',
  templateUrl: './comprehend.component.html',
  styleUrls: ['./comprehend.component.css']
})
export class ComprehendComponent implements OnInit {
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
  viewData: any;
  piiRadio: any = "offsets";

  loader = false;

  response: any;

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
  }

  reset() {
    this.response = null;
    this.comprehendTextarea1 = "Hello Zhang Wei, I am John. Your AnyCompany Financial Services, LLC credit card account 1111-0000-1111-0008 has a minimum payment of $24.53 that is due by July 31st. Based on your autopay settings, we will withdraw your payment on the due date from your bank account number XXXXXX1111 with the routing number XXXXX0000. ";
  }
  copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  async analyze(text: string) {

    console.log(this.piiRadio)
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
          console.log(respdata.entities);
          this.response = respdata;


          // this.response.entities.Entities = this.response.entities.Entities.map((element: any) => ({
          //   ...element,
          //   // @ts-ignore
          //   Score: Math.floor(element.Score * 100)
          // }));
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
          // this.response.sentiment.SentimentScore = this.response.sentiment.SentimentScore.map((element: any) => ({
          //   // @ts-ignore
          //   Positive: element.Positive.toFixed(2),
          //   // @ts-ignore
          //   Negative: element.Negative.toFixed(2),
          //   // @ts-ignore
          //   Neutral: element.Neutral.toFixed(2),
          //   // @ts-ignore
          //   Mixed: element.Mixed.toFixed(2),
          // }));

          console.log("rep" + this.response.entities)
          this.viewData = this.response;
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
          console.log(err);
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



  search(entitySearchInput: string) {
    if (entitySearchInput.length >= 1) {
      // @ts-ignore
      let filterArray = this.viewData.entities.Entities.filter(data => data.Text.toLowerCase().includes(entitySearchInput.toLowerCase()) || data.Type.toLowerCase().includes(entitySearchInput.toLowerCase()) || data.Score === parseInt(entitySearchInput));
      this.viewData.entities.Entities = filterArray;

    }
    else {
      this.viewData.entities.Entities = this.response.entities.Entities;
    }

    console.log("this is herer " + this.response.entities.Entities.length)
  }
  searchPii(entitySearchInput: string) {
    if (entitySearchInput.length >= 1) {
      // @ts-ignore
      let filterArray = this.viewData.piiEntitiesResults.Entities.filter(data => data.Type.toLowerCase().includes(entitySearchInput.toLowerCase()) || data.Score === parseInt(entitySearchInput));
      this.viewData.piiEntitiesResults.Entities = filterArray;

    }
    else {
      this.viewData.piiEntitiesResults.Entities = this.response.piiEntitiesResults.Entities;
    }

    console.log("this is herer " + this.response.piiEntitiesResults.Entities.length)
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
}
