import Autocomplete from 'react-google-autocomplete';

export default function CityAuto({}) {
  return (
    <Autocomplete
      apiKey={GOOGLE_MAPS_API_KEY}
      onPlaceSelected={(place) => {
        console.log(place);
      }}
    />
  );
}
