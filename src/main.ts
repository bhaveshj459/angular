import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// CodeMirror Code
// import '../node_modules/codemirror/'
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/markdown/markdown';
// CodeMirror Code

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as CodeMirror from 'codemirror';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
