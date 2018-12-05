import { symptoms, sicknesses, data } from '../medicalData.js';
export default diagnose;

function diagnose(mySymptoms) {
  var lSicknesses = sicknesses.map(function(sickness) {
    var prob = 0;
    mySymptoms.forEach(function(symptom) {
      if (data[sickness].symptoms.has(symptom)) prob += 1;
    })
    return Object.assign({
      label: sickness,
      score: prob/data[sickness].symptoms.size,
      matches: prob,
      total: data[sickness].symptoms.size,
    }, data[sickness]);
  });

  lSicknesses = lSicknesses.filter(e => e.matches > 0);
  lSicknesses = lSicknesses.sort(comparator).reverse();

  var dSymptoms = symptoms.map(function(symptom) {
    if (mySymptoms.indexOf(symptom) !== -1) return {
      label: symptom,
      value: symptom,
      score: 1,
    };
    var count = 0;
    lSicknesses.forEach(function(sickness) {
      if (data[sickness.label].symptoms.has(symptom)) count += 1;
    });
    return {
      label: symptom,
      value: symptom,
      matches: count,
      score: Math.abs(count/lSicknesses.length - 1)
    }
  });

  dSymptoms = dSymptoms.filter(e => e.score < 1);
  dSymptoms = dSymptoms.sort(comparator);
  return {
    lSicknesses,
    dSymptoms
  }
}

function comparator(a, b) {
  if (a.severe) return 1;
  if (b.severe) return -1;
  return 100 * (a.score - b.score) + (a.matches - b.matches);
}
