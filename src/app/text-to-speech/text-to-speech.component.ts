import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { dom } from '@fortawesome/fontawesome-svg-core';
import { faLariSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent implements OnInit {

  text: string = '';
  remaingText: number = 58 - this.text.length;
  response: boolean = false;
  downloadurl: any;
  loading: boolean = false;

  playState: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  clearText() {
    this.text = '';
    this.response = false;
  }

  convertText() {
    if (this.text.length > 1) {
      let fetchUrl = "https://it2c947od4.execute-api.us-east-1.amazonaws.com/prod/steve?user_id=mreader&speaker=Amy&style=conversational&rate=100.0&bkmus=None&octave=0.0&startmusic=0&startvoice=5&relativevol=15&trailmusic=10&str=" + this.text;
      this.loading = true;

      console.log(this.loading)
      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          this.response = true;
          console.log(data.url);
          this.downloadurl = data.url;
          this.loading = false;
          console.log(this.loading)
        });
    }
  }

  dowloadfile() {
    this.response = false;
  }

  onplay() {
    var ele: any = document.getElementById("audioPlayer");
    this.playState = true;
    ele?.play();

  }

  onpause() {
    var ele: any = document.getElementById("audioPlayer");
    this.playState = false;
    ele?.pause();
  }

  ended() {
    this.playState = false;
  }
}
