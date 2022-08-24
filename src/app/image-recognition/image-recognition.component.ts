import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-recognition',
  templateUrl: './image-recognition.component.html',
  styleUrls: ['./image-recognition.component.css']
})
export class ImageRecognitionComponent implements OnInit {
  searchinput = '';
  database = [{
    title: "Person",
    percent: 90
  }, {
    title: "Human",
    percent: 90
  }, {
    title: "Object",
    percent: 90
  }, {
    title: "Person",
    percent: 90
  }, {
    title: "Person",
    percent: 90
  }, {
    title: "Person",
    percent: 90
  }, {
    title: "Person",
    percent: 90
  }, {
    title: "Person",
    percent: 90
  },];

  results = this.database;

  url: any = "assets/image/sample.png";
  constructor() { }

  ngOnInit(): void {
  }

  selectFile(event: any) { //Angular 11, for stricter type
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  searchFilter() {
    // var input, filter, ul, li, a, i, txtValue;
    var input: any = document.getElementById("search");
    if (this.searchinput.length > 1) {
      // debugger;
      let filterArray = this.database.filter(data => data.title.toLowerCase().includes(this.searchinput.toLowerCase()));
      this.results = filterArray;

    }
    else {
      this.results = this.database
    }
  }
}
