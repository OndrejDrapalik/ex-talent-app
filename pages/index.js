import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/contexts/user-context';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';

import Navbar from '../components/Navbar';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
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
