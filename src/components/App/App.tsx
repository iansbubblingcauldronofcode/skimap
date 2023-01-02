import mapboxgl from 'mapbox-gl';
import { useState } from 'react';
import { BaseMap } from '../BaseMap/BaseMap';
import { StyleMenu } from '../StyleMenu/StyleMenu';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

const App = () => {
  const [mapStyle, setMapStyle] = useState('satellite-streets-v12');
  const [mountainSidesheet, updateMountainSidesheet] = useState({});

  return (
    <>
      <BaseMap mapStyle={mapStyle} updateMountainSidesheet={updateMountainSidesheet} />
      <StyleMenu mapStyle={mapStyle} setMapStyle={setMapStyle} />
    </>
  );
};
export default App;
