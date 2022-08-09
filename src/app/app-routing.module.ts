import { NgModule, importProvidersFrom } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component'
import { TextractComponent } from './textract/textract.component'

const routes: Routes = [
  {
    path: 'text-to-speech', component: TextToSpeechComponent
  },
  {
    path: 'textract', component: TextractComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
