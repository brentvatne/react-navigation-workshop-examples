import * as React from 'react';
import { Button, StyleSheet, StatusBar, View, Text } from 'react-native';
import { SafeAreaView, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

const tabBarIcon = name => ({ tintColor }) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

class A extends React.Component {
  static navigationOptions = {
    tabBarColor: '#6200ee',
    tabBarIcon: tabBarIcon('photo-album'),
  };

  render() {
    return null;
  }
}

class B extends React.Component {
  static navigationOptions = {
    tabBarColor: '#2962ff',
    tabBarIcon: tabBarIcon('inbox'),
  };

  render() {
    return null;
  }
}

class C extends React.Component {
  static navigationOptions = {
    tabBarColor: '#00796b',
    tabBarIcon: tabBarIcon('favorite'),
  };

  render() {
    return null;
  }
}

class D extends React.Component {
  static navigationOptions = {
    tabBarColor: '#c51162',
    tabBarIcon: tabBarIcon('shop'),
  };

  render() {
    return null;
  }
}

let Tabs = createMaterialBottomTabNavigator({ A, B, C, D }, {
  shifting: true,
});

export default createAppContainer(Tabs);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
  },
});
