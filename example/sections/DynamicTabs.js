import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

class GenericTabScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.props.navigation.state.routeName}
        </Text>
        <Button
          title="Go back"
          onPress={() => {
            // This won't work!
            this.props.navigation.goBack(null);

            // This is an alternative but it's not great!
            // this.props.screenProps.parentNavigator.goBack(null)
          }}
        />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Make tab screen with A, B, C"
          onPress={() =>
            this.props.navigation.navigate('Tabs', { names: ['A', 'B', 'C'] })
          }
        />
        <Button
          title="Make tab screen with routes 1, 2, 3"
          onPress={() =>
            this.props.navigation.navigate('Tabs', { names: ['1', '2', '3'] })
          }
        />
      </View>
    );
  }
}

// *************************************************************
//   Note: this is not ideal! you probably should not do this!
// *************************************************************
class TabsScreen extends React.Component {
  constructor(props) {
    super(props);

    // {A: GenericTabScreen, B: GenericTabScreen, C: GenericTabScreen}
    // {1: GenericTabScreen, 2: GenericTabScreen, 3: GenericTabScreen}
    let routeConfigMap = props.navigation
      .getParam('names')
      .reduce((acc, name) => {
        acc[name] = GenericTabScreen;
        return acc;
      }, {});

    this.tabNavigator = createAppContainer(
      createMaterialTopTabNavigator(routeConfigMap)
    );
  }

  render() {
    let Navigator = this.tabNavigator;

    return (
      <Navigator
        detached
        onNavigationStateChange={(prevState, state) => console.log(state)}
        // You probably do not want to do this! But you can pass through the parent navigator
        // if you absolutely must.
        // screenProps={{ parentNavigator: this.props.navigation }}
      />
    );
  }
}

let AppContainer = createAppContainer(
  createStackNavigator(
    { Home: HomeScreen, Tabs: TabsScreen },
    { defaultNavigationOptions: { title: '"Dynamic" tabs' } }
  )
);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        onNavigationStateChange={(prevState, state) => console.log(state)}
      />
    );
  }
}

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
