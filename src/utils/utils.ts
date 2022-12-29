//========================================================
//==================={  Global Fetch  }===================
//========================================================
const fetchConfig = {
  method: 'GET',
  mode: 'cors' as RequestMode,
  headers: {
    'Content-Type': 'application/json',
  },
};
export const fetchData = async (url: string) => await fetch(url, fetchConfig).then((response) => response.json());
//========================================================
//========================================================

// Convert a response from the onthesnow api to a usable geo object
export const convertResortsToMapPoints = (resorts: any) => {
  return Promise.resolve({
    type: 'FeatureCollection',
    features: resorts.map((r: any, index: any) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [r.lng, r.lat],
        },
        properties: {
          id: index,
          name: r.title_short,
          description: `Current base: ${r.snow.base || 'x'}`,
        },
      };
    }),
  });
};
