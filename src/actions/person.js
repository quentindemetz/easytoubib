export const GENDERS = {
  male: 'garçon',
  female: 'fille'
}

export const AGES = {
  '<3m': 'moins de 3 mois',
  '3-6m': 'entre 3 et 6 mois',
  '6-12m': 'entre 6 et 12 mois',
  '1-2y': 'entre 1 et 2 ans',
};

[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].forEach(function(key) {
  AGES[`${key-1}-${key}`] = `entre ${key-1} et ${key} ans`
});
