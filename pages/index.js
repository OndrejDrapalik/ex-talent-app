import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';

import AddTextForm from '../components/AddTextForm';
import GrayOverlay from '../components/GrayOverlay';
import Navbar from '../components/Navbar';

export default function Home() {
  const { user } = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);
  const [entry, setEntry] = useState(false);
  const [effect, setEffect] = useState(false);

  const signInWithGoogle = async () => {
    const userObject = await auth.signInWithPopup(googleAuthProvider);
    await saveData(userObject);
  };

  const saveData = async (props) => {
    const userData = props.user.multiFactor.user;
    console.log('logged in user', userData);
    const userDoc = firestore.doc(`users/${userData.uid}`);
    userDoc.set({
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      email: userData.email,
    });
  };

  return (
    <>
      <Navbar
        user={user}
        dropdown={dropdown}
        entry={entry}
        effect={effect}
        signInWithGoogle={signInWithGoogle}
        onAnimationEnd={() => setEffect(false)}
        onClickSetEntryTrue={() => setEntry(true)}
        onClickFlipDropdownState={() => setDropdown(!dropdown)}
        onClickFlipEntryState={() => setEntry(!entry)}
        onClickFlipEffectState={() => setEffect(!effect)}
      />
      <Title />
    </>
  );
}

const Title = () => {
  return (
    <div
      className="flex flex-col items-center mt-10 font-normal font-lato
    scale-150"
    >
      <h1>Please meet some talented people who’ve worked at Avast.</h1>
    </div>
  );
};
