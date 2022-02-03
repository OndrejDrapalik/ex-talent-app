import React, { useContext } from 'react';
import { AppContext } from '../../lib/contexts/app-context';

import GrayOverlay from '../../components/GrayOverlay';
import AddTextForm from '../../components/AddTextForm';

export default function EntryPage({}) {
  const { message, entry, setEntry } = useContext(AppContext);
  return (
    <div>
      {entry && (
        <GrayOverlay zIndex="z-20" onClick={() => setEntry(!setEntry)} />
      )}

      <AddTextForm zIndex="z-20"></AddTextForm>
      <p>{message}</p>
    </div>
  );
}
