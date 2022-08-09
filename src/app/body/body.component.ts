import { Component, OnInit } from '@angular/core';
import {PopupTextToSpeechComponent} from '../popup-text-to-speech/popup-text-to-speech.component'


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  api:number = 160;
  plat:number = 24;
  res:number = 200;

  systemAndSecurity:string[]=["Firewall","Registry","Services"];
  networkandinternet:string[]=["WiFi and Bluetooth Radio","WiFi Profiles","IP Printer"];
  
  database=[{
    title:"System And Security",
    value:["Firewall","Registry","Services"],
    color:"#0091FF"
  },{
    title:"NETWORK AND INTERNET",
    value:["WiFi and Bluetooth Radio","WiFi Profiles","IP Printer"],
    color:"#6ED301"
  },{
    title:"System And Security",
    value:["Firewall","Registry"],
    color:"#0091FF"
  },{
    title:"HARDWARE",
    value:["Power Managemnt"],
    color:"#00D38D"
  },{
    title:"OTHERS",
    value:["Scheduler","Add a Custom Script"],
    color:"#FF0000"
  },{
    title:"USER ACCOUNTS",
    value:["User Management"],
    color:["#6439FD"]
  },{
    title:"APPEARANCE AND PERSONALIZATION",
    value:["Display","Fonts"],
    color:"#FA6400"
  },{
    title:"CLOCK AND REGION",
    value:["Date/Time","Region"],
    color:"#C5C5C5"
  },{
    title:"EASE OF ACCESS",
    value:["Activate Windows Kiosk Mode","Shortcut"],
    color:"#000000"
  },{
    title:"USER ACCOUNTS",
    value:["User Management"],
    color:"#6439FD"
  },{
    title:"APPEARANCE AND PERSONALIZATION",
    value:["Display","Fonts"],
    color:"#FA6400"
  },{
    title:"CLOCK AND REGION",
    value:["Date/Time","Region"],
    color:"#C5C5C5"
  },{
    title:"EASE OF ACCESS",
    value:["Activate Windows Kiosk Mode","Shortcut"],
    color:"#000000"
  },   ];

  constructor(){}


  ngOnInit() {
  }

}
