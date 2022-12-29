import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

const RESORT_LIMIT = 100;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

// API
const convertResortsToMapPoints = (resorts: any) => {
  return Promise.resolve({
    type: "FeatureCollection",
    features: resorts.map((r: any, index: any ) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [r.lng, r.lat]
        },
        properties: {
          id: index,
          name: r.title_short,
          description: `Current base: ${r.snow.base || 'x'}`
        }
      }
    })
  });
}

// COMPONENT
const Popup = ({ feature }: {feature: any}) => {
  const { id, name, description } = feature.properties;

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      {description}
    </div>
  );
};

// MAP
const App = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }) as any);
  
  // Global Fetch config =====================================
  const baseUrl = 'https://api.onthesnow.com/api/v2/';
  const fetchConfig = {
    method: 'GET',
    mode: 'cors' as RequestMode,
    headers: { 'Content-Type': 'application/json' }
  }
  //==========================================================
  
  const getSnowReport = async (resortId: any) => {
    const fetchUrl = baseUrl + `resort/${resortId}/snowreport`;
    return await fetch(fetchUrl).then((response) => response.json());
  }
  
  const getResortUrl = (regionId: any, page = 0) => `${baseUrl}region/${regionId}/resorts/1/page/${page}?limit=${RESORT_LIMIT}`;
  
  const getResortsByUrl = async (url: string) => await fetch(url, fetchConfig).then((response) => response.json())
  
  const getResortByRegion = async (regionId: any) => {
    let resorts = [];
    const fetchUrl = getResortUrl(regionId, 0)
    const resp = await getResortsByUrl(fetchUrl)
    if(resp.pagination.count > resp.data.length){
      resorts = [... resp.data];
      const resp2 =  await fetch(getResortUrl(regionId, 1), fetchConfig).then((response) => response.json())
      resorts = [...resorts, ...resp2.data]
      console.log(resp2.pagination.count)
      if(resp2.pagination.count > resorts.length){
        const resp3 =  await fetch(getResortUrl(regionId, 2), fetchConfig).then((response) => response.json())
        resorts = [...resorts ,...resp3.data]
        return resorts;
      }
      return resorts;
    }else{
      return resp.data
    }
  }
  
  const getAllResorts = async () => {
    
    // Get all resorts by region (2 is good for now)
    const usaResorts = await getResortByRegion('429');
    const canadaResorts = await getResortByRegion('430');
    const allResorts = [...usaResorts, ...canadaResorts];
    
    // Map the requests we want to send to filler values in the resorts array.
    const requests = allResorts.map(async (resort) => {
      return await getSnowReport(resort['uuid'])
        .then((report) => {
          resort['lat'] = report.latitude;
          resort['lng'] = report.longitude;
          resort['snowReport'] = report;
          return resort;
        });
    })
    
    // Await the Promises (execute the api calls) and return the new array with Promises resolved (snow reports populated).
    return await Promise.all(requests);
  }

  // initialize map when component mounts
  useEffect(() => {
    if(mapContainerRef.current){
      
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        // See style options here: https://docs.mapbox.com/api/maps/#styles
        style: "mapbox://styles/mapbox/satellite-v9",
        center: [-101, 40],
        zoom: 4
      });

      map.on("load", () => {
        
        // add the data source for new a feature collection with no features (but do add the features)
        map.addSource("random-points-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        });
        
        // now add the layer, and reference the data source above by name
        map.addLayer({
          id: "random-points-layer",
          source: "random-points-data",
          type: "symbol",
          layout: {
            // full list of icons here: https://labs.mapbox.com/maki-icons
            "icon-image": "mountain-15",
            "icon-padding": 0,
            "icon-allow-overlap": true
          }
        });
      });
      
      map.on('load', async() => {
        const resorts = await getAllResorts();
        const pointsData = await convertResortsToMapPoints(resorts);
        const source: mapboxgl.GeoJSONSource = map.getSource('random-points-data') as mapboxgl.GeoJSONSource;
        source.setData(pointsData as any);
      })

      // change cursor to pointer when user hovers over a clickable feature
      map.on("mouseenter", "random-points-layer", (e: any) => {
        if (e.features.length) {
          map.getCanvas().style.cursor = "pointer";
        }
      });

      // reset cursor to default when user is no longer hovering over a clickable feature
      map.on("mouseleave", "random-points-layer", () => {
        map.getCanvas().style.cursor = "";
      });

      // add popup when user clicks a point
      map.on("click", "random-points-layer", (e: any)  => {
        if (e.features.length) {
          const feature = e.features[0];
          // create popup node
          const popupNode = document.createElement("div");
          ReactDOM.render(<Popup feature={feature} />, popupNode);
          // set popup on map
          popUpRef.current
            .setLngLat(feature.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map);
        }
      });

      // clean up on unmount
      return () => map.remove();
    }
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;
