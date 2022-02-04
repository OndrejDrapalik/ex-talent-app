import React, { useContext } from 'react';
import { AppContext } from '../../lib/contexts/app-context';

import GrayOverlay from '../../components/GrayOverlay';
import AddTextForm from '../../components/AddTextForm';

export default function EntryPage({}) {
  const { entry, setEntry } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center">
      {entry && <GrayOverlay zIndex="z-20" />}

      <AddTextForm
        zIndex="z-20"
        onClick={() => setEntry(!setEntry)}
      ></AddTextForm>
    </div>
  );
}
