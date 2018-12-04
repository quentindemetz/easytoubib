import { symptoms, sicknesses, data } from '../medicalData.js';
export default diagnose;

function diagnose(mySymptoms) {
  var lSicknesses = sicknesses.map(function(sickness) {
    var prob = 0;
    mySymptoms.forEach(function(symptom) {
      if (data[sickness].has(symptom)) prob += 1;
      else prob -= 1000;
    })
    prob /= data[sickness].size;
    return [sickness, prob]
  });

  lSicknesses = lSicknesses.sort(comparator).reverse();
  lSicknesses = lSicknesses.filter(e => e[1] > 0).map(e => e[0]);

  var dSymptoms = symptoms.map(function(symptom) {
    if (mySymptoms.indexOf(symptom) > -1) return [symptom, 1];
    var count = 0;
    lSicknesses.forEach(function(sickness) {
      if (data[sickness].has(symptom)) count += 1;
    });
    return [symptom, Math.abs(count/lSicknesses.length - 1)];
  });

  dSymptoms = dSymptoms.sort(comparator);
  dSymptoms = dSymptoms.filter(e => e[1] < 1).map(e => e[0]);
  return {
    lSicknesses,
    dSymptoms
  }
}

function comparator(a, b) {
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return 0;
}
