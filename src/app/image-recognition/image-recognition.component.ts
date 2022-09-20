import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-image-recognition',
  templateUrl: './image-recognition.component.html',
  styleUrls: ['./image-recognition.component.css']
})
export class ImageRecognitionComponent implements OnInit {

  toUpload = true;
  width: number = 0;
  height = 0;
  top = 0;
  left = 0;
  change = '';
  loader = false;
  searchinput = '';
  database1 = [];
  database = this.database1
  dowload = false;

  results: any = this.database;

  url: any = "assets/image/person.jpg";
  imageresult: any;
  constructor() { }

  ngOnInit(): void {
  }
  width1: any;
  selectFile(event: any) { //Angular 11, for stricter type
    this.height = 0;
    this.width = 0;
    this.height = 0;
    this.top = 0;
    this.left = 0;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.getImageData(event.target.files[0]);

    let img = new Image();

    img.src = this.url;
    let width2 = '';
    img.onload = function (event) {
      console.log(event);
      console.log("height", img.height);

      console.log('weigth', img.width);
    }

    var ratio = img.naturalWidth / img.naturalHeight
    var width = 380 * ratio
    var height = 380
    if (width > 359) {
      width = 359
      height = 359 / ratio
    }
    this.width = width;
    // if (img.naturalHeight < 400) {
    //   height = height + 50;
    // }
    // else {
    //   height = height;
    // }
    this.height = height;
    console.log('Real Height', height);
    console.log('Real Width', width);
    let mTop = (359 - height) / 2;
    let mStart = (380 - width) / 2;
    this.top = mTop;
    this.left = mStart;




    // var ratio = img.naturalWidth / img.naturalHeight
    // var width = img.height * ratio
    // var height = img.height
    // if (width > img.width) {
    //   debugger
    //   width = 359
    //   height = img.width / ratio
    // }
    // console.log('Real Height', img.height);
    // console.log('Real Width', img.width);
    // let tempWidth = 359 * (width / height);
    // let tempHeight = 382 * (width / height)
    // let mTop = (380 - height) / 2;
    // let mStart = (392 - width) / 2;
    // console.log('Real top', img.naturalHeight);
    // console.log('Real str', img.naturalWidth);


    reader.onload = (_event) => {
      this.url = reader.result;
    }
    event
    //console.log(event.target.files[0])
  }

  //   getRenderedSize(contains:any, cWidth:any, cHeight:any, width:any, height:any, pos:any) {
  //   var oRatio = width / height,
  //     cRatio = cWidth / cHeight;
  //   return function () {
  //     if (contains ? (oRatio > cRatio) : (oRatio < cRatio)) {
  //       width = cWidth;
  //       height = cWidth / oRatio;
  //     } else {
  //       width = cHeight * oRatio;
  //       height = cHeight;
  //     }
  //     //@ts-ignore
  //     this.left = (cWidth - this.width) * (pos / 100);
  //     this.right = this.width + this.left;
  //     return this;
  //   }.call({});
  // }


  // getImgSizeInfo(img:any) {
  //   var pos = window.getComputedStyle(img).getPropertyValue('object-position').split(' ');
  //   return this.getRenderedSize(true,
  //     img.width,
  //     img.height,
  //     img.naturalWidth,
  //     img.naturalHeight,
  //     parseInt(pos[0]));
  // }



  searchFilter() {
    if (this.searchinput.length > 1) {
      // debugger;
      // @ts-ignore
      let filterArray = this.database.filter(data => data.Name.toLowerCase().includes(this.searchinput.toLowerCase()) || data.Confidence == parseInt(this.searchinput));
      this.results = filterArray;
      //console.log(this.results)

    }
    else {
      this.results = this.database
    }
  }

  async getImageData(data: any) {
    this.loader = true;
    let url = "https://u6r0dx9pzc.execute-api.us-east-1.amazonaws.com/v1/upload";
    let body = {
      method: 'POST',
      body: data
    };
    try {
      await fetch(url, body)
        .then(resp => resp.json())
        .then(respData => {
          this.imageresult = respData;
          this.imageresult.body.Labels = respData.body.Labels.filter((element: any) => {
            if (element.Confidence > 82) {
              return element
            }
          })
          this.database = this.imageresult.body.Labels.map((element: any) => ({
            ...element,
            // @ts-ignore
            Confidence: parseInt(element.Confidence)
          }))
          //console.log(this.database);
          this.results = this.database;
          this.dowload = true;
          this.loader = false;
          this.toUpload = false;
        })
        .catch(err => {
          //console.log(err);
          this.loader = false;
        })
    }
    catch (err) {
      this.loader = false;
      console.log(err);
    }
  }

  clr() {
    this.database = [];
    this.results = this.database
    this.imageresult = '';
    this.url = 'assets/image/person.jpg';
    this.change = '';
    this.dowload = false;
    this.toUpload = true;
    this.height = 0;
    this.width = 0;

  }

  exportexcel(): void {

    let element = document.getElementById('image_recognition');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);


    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    XLSX.writeFile(wb, 'imagefile.xlsx');

  }

  reloadComponent() {
    //   let currentUrl = this.router.url;
    //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //   this.router.onSameUrlNavigation = 'reload';
    //   this.router.navigate([currentUrl]);
    window.location.href = '...';
  }
}
