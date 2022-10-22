import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Sentry.init({
  environment: environment.sentry.environment,
  release: environment.sentry.release,
  dsn: 'https://aa6956a2b7e942da82a2901bd21fd7c4@o1043345.ingest.sentry.io/6012905',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://www.ecalendrier.net', 'https://firebasestorage.googleapis.com'],
      routingInstrumentation: Sentry.routingInstrumentation
    })
  ],
  tracesSampleRate: environment.sentry.tracesSampleRate
});

function bootstrap() {
  function bootstrap() {
    platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
  };


 if (document.readyState === 'complete') {
   bootstrap();
 } else {
   document.addEventListener('DOMContentLoaded', bootstrap);
 }
 
}

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
