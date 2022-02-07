import App from 'next/app';
import React, { useState } from 'react';
import { AppContext } from './app-context';
import { UserContext } from './user-context';
import { useUserData } from '../hooks';

export default function AppState(props) {
  const userData = useUserData();

  const [dropdown, setDropdown] = useState(true);
  const [entry, setEntry] = useState(false);
  const [effect, setEffect] = useState(false);

  return (
    <UserContext.Provider value={userData}>
      <AppContext.Provider
        value={{
          dropdown,
          setDropdown,
          entry,
          setEntry,
          effect,
          setEffect,
          message: 'this is from the appState context',
        }}
      >
        {props.children}
      </AppContext.Provider>
    </UserContext.Provider>
  );
}
