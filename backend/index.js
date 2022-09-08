const express= require('express');
//const cors = require('cors');
const http= require('http');
const { json } = require('stream/consumers');
const port=require("./port.json");
const fs=require('fs');

const app=express();

app.use(express.json());
//app.use(cors())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});




let database = new Array();

 database=[{
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

app.get("/",(req,res)=>{
    res.send("hello World!");
})

app.get("/cards",(req,res)=>{
  //res.setHeader('Access-Control-Allow-Origin', '*');
  let resultData;
 fs.readFile('backend/APIcard.json','utf-8',(err,data)=>{
      if(!err){
        resultData= JSON.stringify(data)
      }
    });
    res.send(database);
    res.end();
})

app.listen(port, () => {
  console.log(getData())
  console.log(`Example app listening on port ${port.port}`)
})

function getData(){
  fs.readFile('backend/APIcard.json','utf-8',(err,data)=>{
      if(err){
       return "here"
      }
      else{
        console.log(JSON.parse(data));
        let resultData=JSON.stringify(data);
        return resultData;
      }
    })
}