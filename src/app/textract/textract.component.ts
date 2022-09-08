import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textract',
  templateUrl: './textract.component.html',
  styleUrls: ['./textract.component.css']
})
export class TextractComponent implements OnInit {
  url: any = "assets/image/sample.png";

  rowTextInput = '';
  rowTextDatabase: string[] = ["Adobe InDesign", "Sketch", "Figma", "Illustrator", "Motion Graphics", "OBS Interactivity", "OBS Interactivity", "Content Creator", "Videography"]
  tags = this.rowTextDatabase;

  formsInput = '';
  formsCardsDatabase = [
    {
      heading: "Rech Nr.",
      data: "4572",
    }, {
      heading: "Date",
      data: "4572",
    },
    {
      heading: "Bar",
      data: "Tisch 7/01",
    },
    {
      heading: "Total",
      data: "54.50",
    },
    {
      heading: "Rech Nr.",
      data: "4572",
    },
  ];
  formsCardsData = this.formsCardsDatabase;

  tableInput = '';
  tableDatabase = [
    {
      Item: "Latte Macchiato",
      Qty: 2,
      Price: 4.50,
      Total: 9.00
    },
    {
      Item: "Gloki",
      Qty: 1,
      Price: 5.00,
      Total: 5.00
    },
    {
      Item: "Schweinschnitzel",
      Qty: 1,
      Price: 22.0,
      Total: 22.0
    },
    {
      Item: "Chasspatzli",
      Qty: 1,
      Price: 18.50,
      Total: 18.50
    }
  ];
  tableData = this.tableDatabase;

  queryInput = '';
  queryDatabase = [
    {
      ques: "What is the item name",
      alias: "Name",
      ans: "4572"
    }, {
      ques: "What is the item name",
      alias: "Name",
      ans: "4572"
    }, {
      ques: "What is the item type",
      alias: "Type",
      ans: "Bill"
    }

  ];
  queryData = this.queryDatabase;

  constructor() {

  }
  selectFile(event: any) { //Angular 11, for stricter type
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
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
    if (this.formsInput.length >= 1) {
      let filterArray = this.formsCardsDatabase.filter(data => data.data.toLowerCase().includes(this.formsInput.toLowerCase()));
      this.formsCardsData = filterArray;

    }
    else {
      this.formsCardsData = this.formsCardsDatabase
    }

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
      let filterArray = this.queryDatabase.filter(data => data.ques.toLowerCase().includes(this.queryInput.toLowerCase()) || data.ans.toLowerCase().includes(this.queryInput.toLowerCase()) || data.alias.toLowerCase().includes(this.queryInput.toLowerCase()));
      this.queryData = filterArray;

    }
    if (this.queryInput.length > 0) {
      this.queryData = this.queryDatabase
    }

  }

}
