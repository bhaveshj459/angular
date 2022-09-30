import { Component, OnInit } from '@angular/core';
import { elementAt, throwError } from 'rxjs';
import { Route } from '@angular/router'
import { Router } from 'express';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, retry } from 'rxjs/operators'
import { error } from 'jquery';

// import 'rxjs/add/operator/catch'
@Component({
  selector: 'app-textract',
  templateUrl: './textract.component.html',
  styleUrls: ['./textract.component.css']
})
export class TextractComponent implements OnInit {
  toReset = false
  url: any = "assets/image/sample.png";
  change = '';
  isUploaded = false;
  rowTextInput = '';
  rowTextDatabase: string[] = []
  tags = this.rowTextDatabase;
  loader = false;


  formsInput = '';
  formsCardsDatabase: any = [];
  formsCardsData = this.formsCardsDatabase;

  tableInput = '';
  tableDatabase: any[] = [];
  tableData = this.tableDatabase;

  queryInput = '';
  queryDatabase: any = [];
  queryData = this.queryDatabase;

  constructor(private http: HttpClient) {

  }
  selectFile(event: any) {
    var reader = new FileReader();
    console.log(event.target.files[0]['type'])
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;

      this.getData(event.target.files[0]);

    }


  }
  ngOnInit(): void {
  }


  rowTextSearchFilter() {
    // var input, filter, ul, li, a, i, txtValue;
    var input: any = document.getElementById("search");
    if (this.rowTextInput.length >= 1) {
      // debugger;
      let filterArray = this.rowTextDatabase.filter(data => data.toLowerCase().includes(this.rowTextInput.toLowerCase()));
      this.tags = filterArray;

    }
    else {
      this.tags = this.rowTextDatabase
    }
  }

  formsSearchFilter() {
    //   if (this.formsInput.length >= 1) {
    //     let filterArray = this.formsCardsDatabase.filter((datas: any) => (datas.heading.toLowerCase().includes(this.formsInput.toLowerCase())) || (datas.data == (this.formsInput.toLowerCase())));
    //     this.formsCardsData = filterArray;

    //   }
    //   else {
    //     this.formsCardsData = this.formsCardsDatabase
    //   }

  }

  tableSearchFilter() {
    if (this.tableInput.length >= 1) {
      let filterArray = this.tableDatabase.filter(data => data.Item.toLowerCase().includes(this.tableInput.toLowerCase()) || data.Price == parseFloat(this.tableInput) || data.Qty == parseInt(this.tableInput) || data.Total == parseFloat(this.tableInput));
      this.tableData = filterArray;

    }
    else {
      this.tableData = this.tableDatabase
    }

  }

  querySearchFilter() {
    if (this.queryInput.length > 1) {
      let filterArray = this.queryDatabase.filter((data: any) => data.ques.toLowerCase().includes(this.queryInput.toLowerCase()) || data.ans.toLowerCase().includes(this.queryInput.toLowerCase()) || data.alias.toLowerCase().includes(this.queryInput.toLowerCase()));
      this.queryData = filterArray;

    }
    if (this.queryInput.length > 0) {
      this.queryData = this.queryDatabase
    }
  }

  async getData(file: any) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "image/png");
    this.loader = true;

    try {
      let resp = this.http.post("https://wmo8056gr6.execute-api.ap-south-1.amazonaws.com/dev/textractapiresource", file
        // {
        //   method: 'POST',
        //   headers: myHeaders,
        //   body: file,
        //   redirect: 'follow'
        // }
      )

        .subscribe((result: any) => {
          if (result.errorMessage) {
            console.log(result)
            //@ts-ignore
            alert("ERROR " + result.errorType);
            this.reset();
          }
          else {
            console.log(result);
            this.rowTextDatabase = result.body;
            this.tags = this.rowTextDatabase;
            this.isUploaded = true;

            // this.formsCardsDatabase = result.kvs.map((key: any, value: any) => key + "_" + value);
            // console.log(this.formsCardsData)
            this.formsCardsDatabase = [];
            this.tableDatabase = [];
            for (const [key, value] of Object.entries(result.kvs)) {
              this.formsCardsDatabase.push({
                heading: key,
                data: value
              })
            }
            this.tableDatabase = [];
            // for (const [key, value] of Object.entries(result.table[0])) {
            //   this.formsCardsDatabase.push({
            //     heading: key,
            //     data: value
            //   })
            //   this.
            // }

            result.table.forEach((element: any) => {
              let obj = [];
              //console.log(Object.keys(element));
              for (let index = 1; index <= Object.keys(element).length; index++) {
                var obj2 = []
                for (let index1 = 1; index1 <= Object.keys(element[index]).length; index1++) {
                  obj2.push(element[index][index1]);
                }
                obj.push(obj2);
              }

              console.log(obj);
              //@ts-ignore
              this.tableDatabase = obj;
              this.tableData = this.tableDatabase

            });

            this.formsCardsData = this.formsCardsDatabase
            this.toReset = true;
            this.loader = false;
          }
        },
          (error) => {
            this.loader = false;
            console.log('error', error);
            //@ts-ignore
            alert(error.errorMessage)
          })

    }
    catch (error) {
      this.loader = false;
      console.log('error', error);
      //@ts-ignore
      alert(error.errorMessage)
    }
  }

  reset() {
    this.isUploaded = false;
    this.rowTextInput = '';
    this.rowTextDatabase = []
    this.tags = this.rowTextDatabase;
    this.loader = false;
    this.toReset = false;

    this.formsInput = '';
    this.formsCardsDatabase = [];
    this.formsCardsData = this.formsCardsDatabase;

    this.tableInput = '';
    this.tableDatabase = [];
    this.tableData = this.tableDatabase;

    this.queryInput = '';
    this.queryDatabase = [];
    this.queryData = this.queryDatabase;
    this.change = '';
    this.url = 'assets/image/sample.png'
    //window.location.href = window.location.pathname;
    // this.route.navigate(['/page']); // navigate to other page

  }
}
