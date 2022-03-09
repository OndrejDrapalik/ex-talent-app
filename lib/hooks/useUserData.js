import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase.js';

export function useUserData() {
  const [user] = useAuthState(auth);
  console.log('hook user:', user);

  // Fetches users input data each time user changes on mount
  const [entryCheck, setEntryCheck] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unsubscribe;
    setLoading(true);

    try {
      if (user) {
        const entryRef = firestore
          .collection('users')
          .doc(auth.currentUser.uid)
          .collection('entry_collection')
          .doc('entry_doc');

        unsubscribe = entryRef.onSnapshot((doc) => {
          console.log('hook doc data', doc.data());
          setEntryCheck(doc.data());
          setLoading(false);
        });
      } else {
        setEntryCheck(null);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }

    return unsubscribe;
  }, [user]);

  console.log('loading:', loading);

  return { user, entryCheck, loading };
}
