import { MountainDetail } from '../components/MountainDetail/MountainDetail';
import { configurePointForMap, getFakePointsData } from '../utils/utils';
import { getAllResorts } from '../api/skimap.api';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

export interface UseMapProps {
  mapStyle: string;
  updateMountainSidesheet: (mountainInfo: any) => void;
}

export const useMap = ({ mapStyle, updateMountainSidesheet }: UseMapProps) => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }) as any);

  // initialize map when component mounts
  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: `mapbox://styles/mapbox/satellite-streets-v12`,
        // style: `mapbox://styles/mapbox/${mapStyle}`,
        center: [-101, 40],
        zoom: 4,
      });

      map.on('load', () => {
        // add the data source for new a feature collection with no features (but do not add the features)
        map.addSource('skimapdata', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        });

        // Load an image from an external URL.
        map.loadImage('https://cdn-icons-png.flaticon.com/512/2439/2439606.png', (error, image) => {
          if (error) console.log(error);
          if (image) {
            map.addImage('mountain', image);
          }

          // now add the layer, and reference the data source above by name
          map.addLayer({
            id: 'skimaplayer',
            source: 'skimapdata',
            type: 'symbol',
            layout: {
              'icon-allow-overlap': true,
              'icon-image': 'mountain', // reference the image
              'icon-size': 1.5,
              'icon-padding': 0,
            },
          });
        });
      });

      map.on('load', async () => {
        // const resorts = await getAllResorts();
        // const pointsData = await configurePointForMap(resorts);
        //=====================================================================
        // FAKE 'EM FOR NOW ---> Need more consistent fetching / err handling
        //=====================================================================
        const pointsData = getFakePointsData();
        const source: mapboxgl.GeoJSONSource = map.getSource('skimapdata') as mapboxgl.GeoJSONSource;
        source.setData(pointsData as any);
      });

      // change cursor to pointer when user hovers over a clickable feature
      map.on('mouseenter', 'skimaplayer', (e: any) => {
        if (e.features.length) {
          map.getCanvas().style.cursor = 'pointer';
        }
      });

      // reset cursor to default when user is no longer hovering over a clickable feature
      map.on('mouseleave', 'skimaplayer', () => {
        map.getCanvas().style.cursor = '';
      });

      //================================================================
      // ADD POPUP LAYER: (LEGACY) add popup when user clicks a point
      //================================================================
      map.on('click', 'skimaplayer', (e: any) => {
        if (e.features.length) {
          const feature = e.features[0];
          // create popup node
          const popupNode = document.createElement('div');

          // iDo: find best usecase for React 18+
          ReactDOM.render(<MountainDetail feature={feature} />, popupNode);

          // set popup on map
          popUpRef.current.setLngLat(feature.geometry.coordinates).setDOMContent(popupNode).addTo(map);
        }
      });
      //================================================================

      // iDo: SLIDE OUT SIDESHEET on click!
      /*
      map.on('click', 'skimaplayer', (e: any) => {
        if (e.features.length) {
          updateMountainSidesheet(e.features[0]);
        }
      });
			*/

      // clean up on unmount
      return () => map.remove();
    }
  }, []); // re-add mapStyle to this

  return {
    mapContainerRef,
  } as const;
};
