import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { initReactI18next, useTranslation } from 'react-i18next';

import RNLocalize from 'react-native-localize'
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import i18next from 'i18next';

const en_us = {
  translation: {
    hello: 'Hello world',
    change: 'Change language',
    details: 'Details'
  },
};

const fallback = {
  translation: {
    hello: 'Hello world',
    change: 'Change language',
    details: 'Details'
  },
};

const pt = {
  translation: {
    hello: 'Olá mundo',
    change: 'Alterar idioma',
    details: 'Detalhes'
  },
};

const pt_BR = {
  translation: {
    hello: 'Eae',
    change: 'Muda lingua',
    details: 'Fofoca'
  },
};

const sv = {
  translation: {
    hello: 'Hej världen',
    change: 'Byt språk',
    details: 'WTF'
  },
};

const resources = {
  en: en_us,
  sv,
  pt,
  pt_BR
};

type TranslationKey = keyof typeof fallback.translation

const translate = (stringKey: TranslationKey) => {
  return i18next.t(stringKey)
}

const getAppLocale = () => {
  return `${getLanguage()}_${getCountryCode()}`
}

const getCountryCode = () => {
  return getDeviceLocale().countryCode
}

const getLanguage = () => {
  return getDeviceLocale().languageCode
}

const getDeviceLocale = () => {
  return RNLocalize.getLocales()[0]
}

const getDefinedLanguage = () => {
  const locale = getAppLocale()
  console.warn({locale})
  if (resources.hasOwnProperty(locale)){
    return locale
  }

  const language = getLanguage()
  console.warn({language})
  return language
}

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  debug: false,
  resources,
  lng: getDefinedLanguage()
});

const linking = {
  prefixes: ['deeplinking://', 'https://deeplinking.com'],
  config: {
    screens: {
      Home: 'Home',
      Details: {
        path: 'Details/:text',
        stringify: {
          text: text => text,
        },
      },
    },
  },
};

const Stack = createNativeStackNavigator();

const Home = () => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  return (
    <View style={styles.center}>
      <Text style={styles.text}>{translate('hello')}</Text>
      <TouchableOpacity
        onPress={() =>
          i18n.changeLanguage(i18n.language === 'sv' ? 'en' : 'sv')
        }>
        <Text>{translate('change')}</Text>
      </TouchableOpacity>
      <Button
        title="Details"
        onPress={() => navigation.navigate('Details', {text: 'Test'})}
      />
    </View>
  );
};

// PERSIST LOCALE

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {params} = route;
  return (
    <View style={styles.center}>
      <Text style={styles.text}>{ translate("details")}</Text>
      <Text style={styles.text}>{params.text}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
