import rawData from './gsheet-data.js';

export const sicknesses = rawData.sicknesses.sort();
export const symptoms = rawData.symptoms.sort();
sicknesses.forEach(function(s) {
  rawData.data[s].symptoms = new Set(rawData.data[s].symptoms);
});

export const data = rawData.data;
