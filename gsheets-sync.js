let googleapis = require('googleapis');
let privatekey = require("./gsheets-credentials.json");
let fs = require('fs');

let google = googleapis.google;

let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully authenticated");
  }
});

let spreadsheetId = '1OBTprVXcS1iXNyMtfTtCUn8cJXOl0djCdYzAXxPWOzk'
let sheetName = 'MAIN'
let sheets = google.sheets('v4');
sheets.spreadsheets.values.get({
  auth: jwtClient,
  spreadsheetId: spreadsheetId,
  range: sheetName
}, function (err, response) {
  if (err) {
    console.log('The API returned an error: ' + err);
  } else {
    console.log('The API works');
    let sicknesses = response.data.values.slice(1).map(row => row[0]);
    sicknesses = Array.from(new Set(sicknesses));
    let data = {};
    sicknesses.forEach(s => data[s] = { symptoms: [], severe: false, description: []});
    let symptoms = response.data.values.slice(1).map(row => row[1]).filter(e => (e !== '' && e !== null));
    symptoms = Array.from(new Set(symptoms));
    response.data.values.slice(1).forEach(function(row) {
      var sickness = row[0];
      if (row[1] !== '') data[sickness].symptoms.push(row[1]);
      if (row[2] === 'oui') data[sickness].severe = true;
      if (typeof row[4] !== 'undefined' && row[4] !== '') data[sickness].description.push(row[4])
    });
    fs.writeFileSync('src/gsheet-data.js', 'export default ' + JSON.stringify({sicknesses, symptoms, data}, null, 2));
    console.log(JSON.stringify(data, null, 2))
  }
});
