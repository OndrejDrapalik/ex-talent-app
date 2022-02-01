import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../lib/firebase';

export function useUserData() {
  const [user] = useAuthState(auth);
  console.log('hook user:', user);

  return { user };
}
