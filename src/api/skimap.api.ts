import { fetchData } from '../utils/utils';

// CONFIG
//========
const RESORT_LIMIT = 100;
const baseUrl = 'https://api.onthesnow.com/api/v2/';

// STRINGBUILDERS
//=======================
export const getResortUrl = (regionId: any, page = 0) =>
  `${baseUrl}region/${regionId}/resorts/1/page/${page}?limit=${RESORT_LIMIT}`;

// DATA FETCHERS
//======================

// Get the main list of resorts used by the map.
export const getAllResorts = async () => {
  // Get all resorts by region (2 is good for now)
  const usaResorts = await getResortByRegion('429');
  const canadaResorts = await getResortByRegion('430');
  const allResorts = [...usaResorts, ...canadaResorts];

  // Map the requests we want to send to filler values in the resorts array.
  const requestsBatch1 = allResorts.map(async (resort) => {
    return await getSnowReport(resort['uuid']).then((report) => {
      resort['lat'] = report.latitude;
      resort['lng'] = report.longitude;
      resort['snowReport'] = report;
      return resort;
    });
  });

  // Also get elevation and lift data
  const requestsBacth2 = allResorts.map(async (resort) => {
    return await getResortDetails(resort['uuid']).then((details) => {
      resort['lifts'] = details.lifts;
      resort['elevation'] = details.elevation;
      return resort;
    });
  });

  const requests = [...requestsBatch1, ...requestsBacth2];

  // Await the Promises (execute the api calls) and return the new array with Promises resolved (snow reports populated).
  return await Promise.all(requests);
};

// Get recent snow plus lat/lng for every result (only way for now)
export const getSnowReport = async (resortId: any) => await fetchData(baseUrl + `resort/${resortId}/snowreport`);

// Get other details (elevation, lifts, etc.)
export const getResortDetails = async (resortId: any) => await fetchData(baseUrl + `resort/${resortId}/trailMap`);

// Fetch all resorts in a region given the Region ID
export const getResortByRegion = async (regionId: any) => {
  let resorts = [];
  const resp = await fetchData(getResortUrl(regionId, 0));

  // iDo: fix this absolute disaster
  if (resp.pagination.count > resp.data.length) {
    resorts = [...resp.data];
    const resp2 = await fetchData(getResortUrl(regionId, 1));
    resorts = [...resorts, ...resp2.data];
    if (resp2.pagination.count > resorts.length) {
      const resp3 = await fetchData(getResortUrl(regionId, 2));
      resorts = [...resorts, ...resp3.data];
      return resorts;
    }
    return resorts;
  } else {
    return resp.data;
  }
};
