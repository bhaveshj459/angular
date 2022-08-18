import { NgModule, importProvidersFrom } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';
import { TextractComponent } from './textract/textract.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { ComprehendComponent } from './comprehend/comprehend.component';
import { ImageRecognitionComponent } from './image-recognition/image-recognition.component';

const routes: Routes = [
  {
    path: 'text-to-speech', component: TextToSpeechComponent
  },
  {
    path: 'textract', component: TextractComponent
  },
  {
    path: 'speech-to-text', component: SpeechToTextComponent
  },
  {
    path: 'comprehend', component: ComprehendComponent
  },
  {
    path: 'image-recognition', component: ImageRecognitionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
