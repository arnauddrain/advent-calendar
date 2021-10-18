import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { env } from 'process';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Sentry.init({
  environment: environment.sentry.environment,
  dsn: 'https://aa6956a2b7e942da82a2901bd21fd7c4@o1043345.ingest.sentry.io/6012905',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://firebasestorage.googleapis.com'],
      routingInstrumentation: Sentry.routingInstrumentation
    })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: environment.sentry.tracesSampleRate
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
