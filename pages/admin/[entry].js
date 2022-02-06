import React, { useContext } from 'react';
import { AppContext } from '../../lib/contexts/app-context';

import GrayOverlay from '../../components/GrayOverlay';
import AddTextForm from '../../components/AddTextForm';

import { firestore, auth, serverTimestamp } from '../../lib/firebase';

const entryRef = firestore
  .collection('users')
  .doc(auth.currentUser.uid)
  .collection('entry collection')
  .doc('entry doc');

export default function EntryPage({}) {
  const { entry, setEntry } = useContext(AppContext);

  const handleFormikSubmit = async (values) => {
    // alert(JSON.stringify(values, null, 2));
    await entryRef.set({
      values,
      updatedAt: serverTimestamp(),
      id: auth.currentUser.uid,
    });
  };

  return (
    <div className="flex flex-col items-center">
      {entry && <GrayOverlay zIndex="z-20" />}

      <AddTextForm
        zIndex="z-20"
        onClick={() => setEntry(!setEntry)}
        onSubmit={handleFormikSubmit}
      ></AddTextForm>
    </div>
  );
}
