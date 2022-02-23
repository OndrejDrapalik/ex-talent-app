import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import AddTextForm from '../../components/AddTextForm';

import { useContext } from 'react';
import { UserContext } from '../../lib/contexts/user-context';

import { firestore, auth, serverTimestamp } from '../../lib/firebase';

export default function EntryPage() {
  const { user, entryCheck } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log('user.uid', user.uid);
      const entryRef = firestore
        .collection('users')
        .doc(user.uid)
        .collection('entry_collection')
        .doc('entry_doc');
      return entryRef;
    }
  }, [user]);

  const handleFormikSubmit = async (values) => {
    // alert(JSON.stringify(values, null, 2));
    await entryRef.set({
      values,
      updatedAt: serverTimestamp(),
      id: auth.currentUser.uid,
    });

    !entryCheck && toast.success('Post created successfully!');
    entryCheck && toast.success('Post edited successfully!');

    router.push('/');
  };

  return (
    <div className="flex flex-col items-center">
      <AddTextForm zIndex="z-20" onSubmit={handleFormikSubmit}></AddTextForm>
    </div>
  );
}
