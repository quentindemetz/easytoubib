import { symptoms, sicknesses, data } from '../medicalData.js';
export default diagnose;

function diagnose(mySymptoms) {
  var lSicknesses = sicknesses.map(function(sickness) {
    var prob = 0;
    mySymptoms.forEach(function(symptom) {
      if (data[sickness].has(symptom)) prob += 1;
    })
    return {
      label: sickness,
      score: prob/data[sickness].size,
      matches: prob,
      total: data[sickness].size,
    };
  });

  lSicknesses = lSicknesses.sort(comparator).reverse();
  lSicknesses = lSicknesses.filter(e => e.matches > 0);

  var dSymptoms = symptoms.map(function(symptom) {
    if (mySymptoms.indexOf(symptom) > -1) return {
      label: symptom,
      score: 1,
    };
    var count = 0;
    lSicknesses.forEach(function(sickness) {
      if (data[sickness.label].has(symptom)) count += 1;
    });
    return {
      label: symptom,
      score: Math.abs(count/lSicknesses.length - 1)
    }
  });

  dSymptoms = dSymptoms.sort(comparator);
  dSymptoms = dSymptoms.filter(e => e.score < 1);
  return {
    lSicknesses,
    dSymptoms
  }
}

function comparator(a, b) {
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
}
