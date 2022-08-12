import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'

 import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';
import { PopupTextToSpeechComponent } from './popup-text-to-speech/popup-text-to-speech.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';
import { TextractComponent } from './textract/textract.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SearchBarComponent,
    SidebarComponent,
    BodyComponent,
    PopupTextToSpeechComponent,
    TextToSpeechComponent,
    TextractComponent,
    SpeechToTextComponent,

  ],
  entryComponents: [PopupTextToSpeechComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// import {NgModule} from '@angular/core';
// import {BrowserModule} from '@angular/platform-browser';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { PopupTextToSpeechComponent } from './popup-text-to-speech/popup-text-to-speech.component';

// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {MatNativeDateModule} from '@angular/material/core';
// import {HttpClientModule} from '@angular/common/http';

// @NgModule({
//   declarations: [ AppComponent, PopupTextToSpeechComponent ],
//   imports: [
//     BrowserAnimationsModule,
//     BrowserModule,
//     FormsModule,
//     HttpClientModule,
//     MatNativeDateModule,

//     ReactiveFormsModule,
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
