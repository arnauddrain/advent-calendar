export const environment = {
  production: true,
  stripeLink: 'https://buy.stripe.com/test_fZe5nC2uA42yazufYY',
  firebase: {
    apiKey: 'AIzaSyAsBtxr5-Yin0s-3wfhyStn4VESdGjQxOA',
    authDomain: 'auth.ecalendrier.net',
    databaseURL: 'https://advent-calendar-b80d7.firebaseio.com',
    projectId: 'advent-calendar-b80d7',
    storageBucket: 'advent-calendar-b80d7.appspot.com',
    messagingSenderId: '463287392377',
    appId: '1:463287392377:web:d265b8498dd54218c25ca8',
    measurementId: 'G-RNKWRY2S12'
  },
  sentry: {
    environment: 'preview',
    tracesSampleRate: 0.1,
    release: 'SENTRY_RELEASE'
  }
};
