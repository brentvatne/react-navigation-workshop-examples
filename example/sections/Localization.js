import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Localization } from 'expo';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import i18n from 'i18n-js';

const en = {
  foo: 'Foo',
  bar: 'Bar {{someValue}}',
};

const fr = {
  foo: 'Fou',
  bar: 'Bár {{someValue}}',
};

i18n.fallbacks = true;
i18n.translations = { fr, en };

class Screen extends React.Component {
  static navigationOptions = ({ screenProps: { t } }) => ({
    title: t('foo'),
  });

  render() {
    let { t, locale } = this.props.screenProps;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          Current locale: {locale}.{' '}
          {locale !== 'en' && locale !== 'fr'
            ? 'Translations will fall back to "en" because none available'
            : null}
        </Text>
        <Text>{t('bar', { someValue: Date.now() })}</Text>
        {locale === 'en' ? (
          <Button
            title="Switch to French"
            onPress={() => this.props.screenProps.setLocale('fr')}
          />
        ) : (
          <Button
            title="Switch to English"
            onPress={() => this.props.screenProps.setLocale('en')}
          />
        )}
      </View>
    );
  }
}

const Stack = createStackNavigator({ Home: Screen });
const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  state = {
    locale: Localization.locale,
  };

  setLocale = locale => {
    this.setState({ locale });
  };

  t = (scope, options) => {
    return i18n.t(scope, { locale: this.state.locale, ...options });
  };

  render() {
    return (
      <AppContainer
        screenProps={{
          t: this.t,
          locale: this.state.locale,
          setLocale: this.setLocale,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
