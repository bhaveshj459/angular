import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textract',
  templateUrl: './textract.component.html',
  styleUrls: ['./textract.component.css']
})
export class TextractComponent implements OnInit {
  url: any = "assets/image/sample.png";

  tags: string[] = ["Adobe InDesign", "Sketch", "Figma", "Illustrator", "Motion Graphics", "OBS Interactivity", "OBS Interactivity", "Content Creator", "Videography"]

  formsCardsData = [
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
  ]

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

}
