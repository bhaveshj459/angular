import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textract',
  templateUrl: './textract.component.html',
  styleUrls: ['./textract.component.css']
})
export class TextractComponent implements OnInit {
  img: string = "assets/image/sample.png";

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

  ngOnInit(): void {
  }

}
