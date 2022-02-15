import React from 'react';
import { useRouter } from 'next/router';

import AddTextForm from '../../components/AddTextForm';

import { firestore, auth, serverTimestamp } from '../../lib/firebase';

export default function EntryPage({}) {
  const router = useRouter();

  const entryRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('entry_collection')
    .doc('entry_doc');

  const handleFormikSubmit = async (values) => {
    // alert(JSON.stringify(values, null, 2));
    await entryRef.set({
      values,
      updatedAt: serverTimestamp(),
      id: auth.currentUser.uid,
    });
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center">
      <AddTextForm zIndex="z-20" onSubmit={handleFormikSubmit}></AddTextForm>
    </div>
  );
}
