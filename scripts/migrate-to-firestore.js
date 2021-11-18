var admin = require('firebase-admin');

// from
var serviceAccount = require('./env-prod.json');

(async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://advent-calendar-b80d7.firebaseio.com'
    });

    const db = admin.database();
    const firestore = admin.firestore();

    const ref = db.ref('calendars');
    ref.once('value', async function (snapshot) {
      const calendars = snapshot.val();
      let current = 0;
      const length = Object.entries(calendars).length;
      for (const [calendarId, calendar] of Object.entries(calendars)) {
        console.log('doing', ++current, 'on', length, calendarId);
        firestore.doc(`calendars/${calendarId}`).set(calendar);
      }
    });
  } catch (e) {
    console.error(e);
  }
})();
