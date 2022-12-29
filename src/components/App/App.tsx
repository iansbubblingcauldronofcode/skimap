import mapboxgl from 'mapbox-gl';
import { BaseMap } from '../BaseMap/BaseMap';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

const App = () => {
  return <BaseMap />;
};
export default App;
