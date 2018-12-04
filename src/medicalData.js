import rawData from './gsheet-data.js';

export const sicknesses = rawData.sicknesses;
export const symptoms = rawData.symptoms;
var d = {};
sicknesses.forEach(function(s) {
  d[s] = new Set(rawData.data[s]);
});

export const data = d;
