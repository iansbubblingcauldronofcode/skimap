import fakePointsData from './../mockData/pointsData.json';
//========================================================
//==================={  Global Fetch  }===================
//========================================================
const fetchConfig = {
  method: 'GET',
  mode: 'cors' as RequestMode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000', // hmm...
  },
};
export const fetchData = async (url: string) => await fetch(url, fetchConfig).then((response) => response.json());
//========================================================
//========================================================

// Convert a response from the onthesnow api to a usable geo object
export const configurePointForMap = (resorts: any) => {
  // Use this to check other possible fields.
  return Promise.resolve({
    type: 'FeatureCollection',
    features: resorts.map((r: any, index: any) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [r.lng, r.lat],
        },

        // FORMATTED STRINGS for component.
        properties: {
          id: index,
          name: r.title,
          snowNew: r.snow.last24,
          snowBase: r.snow.base,
          snowSummit: r.snow.summit,
          liftsOpen: `${r.lifts.open} / ${r.lifts.total}`,
          runsOpen: `${r.runs.open} / ${r.runs.total} (${r.runs.open}%)`,
          image: r.snowReport?.smallImage,
          trailMap: r.snowReport?.trailMap.image,
          acresOpen: r.snowReport.acres?.open,
          acresTotal: r.snowReport.acres?.total,
          summit: r.elevation?.summit,
          vertical: r.elevation?.verticalDrop,
          base: r.elevation?.base,
        },
      };
    }),
  });
};

//=========================
// FRONTEND STUFF
//=========================

export const cmToIn = (cm: number) => Math.round(cm * 0.393701);
export const mToFt = (m: number) => Math.round(m * 3.28084);

export const getFakePointsData = () => fakePointsData;
