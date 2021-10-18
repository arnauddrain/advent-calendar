// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCPH5aQv8cD5z80VVmq5NOTBDKrUiUbnss',
    authDomain: 'advent-calendar-dev.firebaseapp.com',
    databaseURL: 'https://advent-calendar-dev.firebaseio.com',
    projectId: 'advent-calendar-dev',
    storageBucket: 'advent-calendar-dev.appspot.com',
    messagingSenderId: '317779781951',
    appId: '1:317779781951:web:2c4f4c0e5b9ea8ebc34b8a',
    measurementId: 'G-H1LCVLWWPC'
  },
  sentry: {
    environment: 'development',
    tracesSampleRate: 1.0
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
