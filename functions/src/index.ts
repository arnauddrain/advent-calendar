import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const handleStripe = onRequest({ region: 'europe-west3' }, (request, response) => {
  logger.info('Received new payment');
  const { data } = request.body as {
    data: {
      object: {
        client_reference_id: string;
      };
    };
  };
  const userId = data.object.client_reference_id;
  if (!userId) {
    logger.error('No client_reference_id provided');
    response.status(400).send('No client_reference_id provided');
  }

  logger.info(`Processing payment for user ${userId}`);

  const db = admin.firestore();

  db.doc(`users/${userId}`).set({ premium: true });

  response.send('User is now premium!');
});
