import { useMap } from '../../hooks/useMap';
import { useState } from 'react';

export const BaseMap = () => {
  // See style options here: https://docs.mapbox.com/api/maps/#styles
  const [mapStyle, setMapStyle] = useState('satellite-v9');
  const { mapContainerRef } = useMap({ mapStyle });
  return <div className="map-container" ref={mapContainerRef} />;
};
