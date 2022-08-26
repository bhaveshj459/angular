import { Component, OnInit, Input } from '@angular/core';
import { elementAt } from 'rxjs';
import { PopupTextToSpeechComponent } from '../popup-text-to-speech/popup-text-to-speech.component'


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {


  api: number = 160;
  plat: number = 24;
  res: number = 200;
  searchinput: string = '';

  systemAndSecurity: string[] = ["Firewall", "Registry", "Services"];
  networkandinternet: string[] = ["WiFi and Bluetooth Radio", "WiFi Profiles", "IP Printer"];

  database = [{
    title: "TEXT EXTRACTION FROM IMAGE",
    value: [{
      title: "Image To Text",
      link: "/textract"
    }],
    color: "#0091FF",
  }, {
    title: "SPEECH TO TEXT",
    value: [{
      title: "Speech To Text",
      link: "/speech-to-text"
    }],
    color: "#6ED301",
  }, {
    title: "TEXT TO SPEECH",
    value: [{
      title: "Text To Speech",
      link: "/text-to-speech"
    }],
    color: "#0091FF",
  }, {
    title: "IMAGE RECOGNITION",
    value: [{
      title: "Image Recognition",
      link: "/image-recognition"
    }],
    color: "#00D38D",
  }, {
    title: "COMPREHEND",
    value: [{
      title: "Comprehend",
      link: "/comprehend"
    }],
    color: "#FF0000"
  }, {
    title: "USER ACCOUNTS",
    value: [{
      title: "User Management",
      link: "/"
    }],
    color: ["#6439FD"]
  }, {
    title: "APPEARANCE AND PERSONALIZATION",
    value: [{
      title: "Display",
      link: "/"
    }, {
      title: "Fonts",
      link: "/"
    }],
    color: "#FA6400"
  }, {
    title: "CLOCK AND REGION",
    value: [{
      title: "Date/Time",
      link: "/"
    }, {
      title: "Region",
      link: "/"
    }],
    color: "#C5C5C5"
  }, {
    title: "EASE OF ACCESS",
    value: [{
      title: "Activate Windows Kiosk Mode",
      link: "/"
    }, {
      title: "Shortcut",
      link: "/"
    }],
    color: "#000000"
  }, {
    title: "USER ACCOUNTS",
    value: [{
      title: "User Management",
      link: "/"
    }],
    color: "#6439FD"
  }, {
    title: "APPEARANCE AND PERSONALIZATION",
    value: [{
      title: "Display",
      link: "/"
    }, {
      title: "Fonts",
      link: "/"
    }],
    color: "#FA6400"
  }, {
    title: "CLOCK AND REGION",
    value: [{
      title: "Date/Time",
      link: "/"
    }, {
      title: "Region",
      link: "/"
    }],
    color: "#C5C5C5"
  }, {
    title: "EASE OF ACCESS",
    value: [{
      title: "Activate Windows Kiosk Mode",
      link: "/"
    }, {
      title: "Shortcut",
      link: "/"
    }],
    color: "#000000"
  },];

  viewdata = this.getItems();
  @Input() sort = 0;
  constructor() {

  }

  ngOnInit() {
    if (this.getItems() == null) {
      this.setItems(this.database);
      this.viewdata = this.getItems();
    }
    if (this.sort == 0)
      this.setItems(this.database);
    console.log(this.viewdata);
    console.log(this.sort);
    if (this.sort == 1) {
      // debugger;
      if (localStorage.getItem("inputEle")) {
        this.searchinput = localStorage.getItem("inputEle")!;
      }
      if (this.getItems()) {
        this.viewdata = this.getItems();
      }
      else {
        this.viewdata = this.database;
      }

      this.viewdata.sort((a: any, b: any) => {
        const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        const nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }
    else if (this.sort == -1) {

      if (localStorage.getItem("inputEle")?.length) {
        this.searchinput = localStorage.getItem("inputEle")!;
      }

      if (this.getItems()) {
        this.viewdata = this.getItems();
      }
      else {
        this.viewdata = this.database;
      }

      this.viewdata.sort((a: any, b: any) => {
        const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        const nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      });
      if (!this.getItems())
        this.setItems(this.database);
    }

  }

  searchFilter() {
    // debugger;
    let filterArray = this.database
      .map((element) => ({
        ...element,
        value: element.value.filter(data => data.title.toLowerCase().includes(this.searchinput.toLowerCase()))
      }))
      .filter(data => data.value.length > 0);
    this.setItems(filterArray);
    //this.viewdata = filterArray;
    this.viewdata = this.getItems();
    localStorage.setItem("inputEle", this.searchinput)

  }


  getItems(): any {
    return JSON.parse(localStorage.getItem("APIData")!)
  }
  setItems(data: any) {
    localStorage.setItem("APIData", JSON.stringify(data))
  }
}
