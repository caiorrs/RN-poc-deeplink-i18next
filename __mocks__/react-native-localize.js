import * as RNLocalize from 'react-native-localize/mock.js';

export const getLocales = () => [
  // extend if needed, add the locales you want
  {countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false},
  {countryCode: 'FR', languageTag: 'fr-FR', languageCode: 'fr', isRTL: false},
];

// module.exports = jest.mock('react-native-localize', () => RNLocalize);
