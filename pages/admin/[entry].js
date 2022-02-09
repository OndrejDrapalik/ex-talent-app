import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../lib/contexts/app-context';
import { UserContext } from '../../lib/contexts/user-context';

import GrayOverlay from '../../components/NavbarComponents/HelperComponents/GrayOverlay';
import AddTextForm from '../../components/AddTextForm';

import { firestore, auth, serverTimestamp } from '../../lib/firebase';

export default function EntryPage({}) {
  const { user } = useContext(UserContext);
  const { entry, setEntry } = useContext(AppContext);

  const entryRef = firestore
    .collection('users')
    .doc(user.uid)
    .collection('entry collection')
    .doc('entry doc');

  const handleFormikSubmit = async (values) => {
    alert(JSON.stringify(values, null, 2));
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
