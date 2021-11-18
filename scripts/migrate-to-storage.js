var admin = require('firebase-admin');

var serviceAccount = require('./env2.json');

(async () => {
  try {

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: serviceAccount.databaseURL,
      storageBucket: serviceAccount.storageBucket
    });

    const db = admin.database();
    const bucket = admin.storage().bucket();

    const ref = db.ref('calendars');
    ref.once('value', async function (snapshot) {
      const calendars = snapshot.val();
      let current = 0;
      const length = Object.entries(calendars).length;
      for (const [calendarId, calendar] of Object.entries(calendars)) {
        console.log('doing', current++, 'on', length);
        if (calendar.days) {
          for (const [dayIndex, day] of Object.entries(calendar.days)) {
            const url = calendar.author + '/calendars/' + calendarId + '/' + dayIndex + '.html';
            console.log('uploading file...');
            await bucket.file(url).save(day.text);
            console.log('uploaded!');
          }
          console.log('deleting days...');
          await ref.child(calendarId).update({
            days: {}
          })
        }
      }
    })
  } catch (e) {
    console.error(e);
  }
})();
