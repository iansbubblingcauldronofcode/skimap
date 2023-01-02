import { Dispatch, SetStateAction } from 'react';
import { useMap } from '../../hooks/useMap';

export interface BaseMapProps {
  mapStyle: string;
  updateMountainSidesheet: Dispatch<SetStateAction<any>>;
}

export const BaseMap = ({ mapStyle, updateMountainSidesheet }: BaseMapProps) => {
  // See style options here: https://docs.mapbox.com/api/maps/#styles
  const { mapContainerRef } = useMap({ mapStyle, updateMountainSidesheet });
  return <div className="map-container" ref={mapContainerRef} />;
};
