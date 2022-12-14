import { Component, OnInit } from '@angular/core';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';
declare var $: any;
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit {
  selectAll: boolean = false;
  toReset = false;
  financial0 = false;
  financial = false;
  countP1 = 0;
  countP2 = 0;
  loader = false;
  toBeDisplayedtext = 'Submit';
  file: any;
  fileName = '';
  outputData: any;
  fileUrl: any;
  toSubmit = false;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }
  toggleChanges() {

    this.financial = this.selectAll;
    this.financial0 = this.selectAll

    var parent: any = document.getElementById("select_all");
    var c1: any = document.getElementById('parentUl');

    for (let p = 0; p < c1.children.length; p++) {

      for (let i = 0; i < c1.children[p].children[2].children.length; i++) {
        c1.children[p].children[2].children[i].children[0].checked = parent.checked;
      }
    }
    this.calcTotalClicked();

    // this.countP1 = 0;
    // this.countP2 = 0;

    this.checkParent();
  }

  testFunc() {
    //console.log(document.getElementById("financial1_list")?.children.length)
  }




  calcTotalClicked() {
    let parentEle: any = document.getElementById("financial_list");
    this.countP1 = 0;
    this.countP2 = 0;
    for (let i = 0; i < parentEle.children.length; i++) {
      if (parentEle.children[i].children[0].checked)
        this.countP1++
    }

    let parentEle2: any = document.getElementById("financial1_list");
    for (let i = 0; i < parentEle2.children.length; i++) {
      if (parentEle2.children[i].children[0].checked)
        this.countP2++
    }
    //console.log(this.countP1);
    this.checkParent();
  }

  checkParent() {
    let parent = true;
    var c1: any = document.getElementById('parentUl');
    for (let p = 0; p < c1.children.length; p++) {
      c1.children[p].children[0].checked = true;
      for (let i = 0; i < c1.children[p].children[2].children.length; i++) {
        if (!c1.children[p].children[2].children[i].children[0].checked) {
          parent = false;
          c1.children[p].children[0].checked = false;
        }
      }
    }
    this.selectAll = parent;
    // c1.children[p].children[0].checked = children[0];
    // c1.children[1].children[0].checked = children[1];
  }

  selectAllSubParent() {
    var c1: any = document.getElementById('parentUl');
    for (let p = 0; p < c1.children.length; p++) {

      for (let i = 0; i < c1.children[p].children[2].children.length; i++) {
        c1.children[p].children[2].children[i].children[0].checked = c1.children[p].children[0].checked;
      }

    }

    this.calcTotalClicked()
  }


  selectFile(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    this.toSubmit = true;
    // this.getTokenId(event.target.files[(event.target.files.length) - 1]);
  }

  async getTokenId(file: any) {
    this.loader = true;
    this.toBeDisplayedtext = 'Transcription...';
    var formdata = new FormData();
    formdata.append("File", file);
    formdata.append("Settings", "{\"setting1\": \"settings\", \"settings2\": \"settings\"}");

    try {
      await fetch("https://7khsyf0wyi.execute-api.ap-south-1.amazonaws.com/dev/upload", {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          if (result.errorMessage) {
            console.log(result)
            //@ts-ignore
            alert("ERROR " + respData.errorType);
            this.loader = false;
            this.loader = false;
            this.toBeDisplayedtext = 'Failed To Upload';
            this.toReset = true;
          }
          else {
            console.log(result)
            //this.loader = false;
            this.toBeDisplayedtext = 'Getting Transcription Job ';
            this.getData(result.TranscriptionJobName)
          }
        })
        .catch(error => {
          console.log('error', error);
          this.loader = false;
          this.toBeDisplayedtext = 'Failed To Upload';
        });
    }
    catch (error) {
      console.log('error', error);
      this.loader = false;
      this.loader = false;
      this.toBeDisplayedtext = 'Failed To Upload';
      this.toReset = true;
    }

  }

  async getData(tokenID: string) {


    try {
      await fetch("https://7khsyf0wyi.execute-api.ap-south-1.amazonaws.com/dev/get-transcribe?name=" + tokenID, {
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          if (result.status == "FAILED") {
            console.log(result);
            this.toBeDisplayedtext = "FAILED";
            this.loader = false;
          }
          else {
            console.log(result);
            this.loader = false;
            this.toBeDisplayedtext = 'DONE!';
            this.outputData = result.response.data.results.transcripts[0].transcript;
            const data = this.outputData;
            const blob = new Blob([data], { type: 'application/octet-stream' });

            this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
            this.toReset = true;
            this.toSubmit = false;
          }
        })
        .catch(error => console.log('error', error));
    }
    catch {
      this.loader = false;
    }
    finally {
      this.loader = false;
      this.toReset = true;

    }
  }

  clearDemo() {
    this.loader = false;
    this.toBeDisplayedtext = 'Select File';
    this.outputData = null;
    this.file = null;
    this.fileName = '';
    this.toReset = false;
  }
}
