import GrayOverlay from '../../components/GrayOverlay';
import AddTextForm from '../../components/AddTextForm';

export default function EntryPage({}) {
  return (
    <div>
      <GrayOverlay
        zIndex="z-20"
        onClick={() => console.log('admin/[entry].js page click')}
      />
      <AddTextForm zIndex="z-20"></AddTextForm>
    </div>
  );
}
