import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

export default () => {
  console.log(config);
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};
