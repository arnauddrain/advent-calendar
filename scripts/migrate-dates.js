var admin = require('firebase-admin');

// from
var serviceAccount = require('./env-dev.json');

function pad(n) {
  if (n < 10) {
    return '0' + n;
  }
  return n.toString();
}

function updateDate(date, defaultDate) {
  if (date && date.endsWith('Z')) {
    const dateObj = new Date(date);
    const dateStr = dateObj.getFullYear() + '-' + pad(dateObj.getMonth() + 1) + '-' + pad(dateObj.getDate());
    return dateStr;
  } else if (date && date.length === 10) {
    return date;
  } else {
    if (date !== undefined) {
      console.log('chelou', date);
    }
    return defaultDate;
  }
}

(async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://advent-calendar-b80d7.firebaseio.com'
    });

    const firestore = admin.firestore();

    const ref = firestore.collection('calendars');
    const snapshot = await ref.get();

    const promises = [];
    snapshot.forEach((doc) => {
      const currentData = doc.data();
      const data = {
        createdAt: doc.createTime,
        startDate: updateDate(currentData.startDate, '2020-12-01'),
        endDate: updateDate(currentData.endDate, '2020-12-25')
      };

      promises.push(firestore.doc('calendars/' + doc.id).update(data));
    });
    console.log('awaiting', promises.length, 'promises');
    await Promise.all(promises);
  } catch (e) {
    console.error(e);
  }
})();
