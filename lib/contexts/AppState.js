import App from 'next/app';
import React, { useState } from 'react';
import { AppContext } from './app-context';

export default function AppState(props) {
  const [dropdown, setDropdown] = useState(false);
  const [entry, setEntry] = useState(false);
  const [effect, setEffect] = useState(false);

  return (
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
  );
}
