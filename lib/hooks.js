import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../lib/firebase';

export function useUserData() {
  const [user] = useAuthState(auth);
  console.log('hook user:', user);

  // Fetches user img
  const [image, setImage] = useState();

  //   useEffect(() => {
  //     let unsubscribe;

  //     if (user) {
  //       const ref = firestore.collection('users').doc(auth?.currentUser?.uid);

  //       unsubscribe = ref.onSnapshot((doc) => {
  //         // get photoURL from doc.data() ^
  //         setImage(doc.data()?.photoURL);
  //       });
  //     }

  //     //else {
  //     //   setImage(null);
  //     // }
  //     return unsubscribe;
  //   }, [user]);

  return { user, image };
}
