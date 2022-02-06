import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDnGTHEYwk_pfcUgjCOFHk3WkNkcrLvV5E',
  authDomain: 'ex-talent-app.firebaseapp.com',
  projectId: 'ex-talent-app',
  storageBucket: 'ex-talent-app.appspot.com',
  messagingSenderId: '538303710483',
  appId: '1:538303710483:web:c57d0f80dea6fa4ddd86e6',
  measurementId: 'G-2YERCP5E2C',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export function postToJSON(doc) {
  const data = doc.data();
  console.log(data);
  return {
    ...data,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
