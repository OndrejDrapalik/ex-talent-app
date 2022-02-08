import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../lib/firebase';

export function useUserData() {
  const [user] = useAuthState(auth);
  console.log('hook user:', user);

  // Fetches user img
  const [entryCheck, setEntryCheck] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const entryRef = firestore
        .collection('users')
        .doc(auth.currentUser.uid)
        .collection('entry collection')
        .doc('entry doc');

      unsubscribe = entryRef.onSnapshot((doc) => {
        console.log('doc data', doc.data());
        setEntryCheck(doc.data());
      });
    } else {
      setEntryCheck(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, entryCheck };
}
