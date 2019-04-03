import * as React from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  withNavigation,
} from 'react-navigation';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

@withNavigation
class GenericTabScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.props.navigation.state.routeName}
        </Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
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

class TabsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: props.navigation
        .getParam('names')
        .map(name => ({ key: name, title: name })),
      sceneMap: SceneMap(
        props.navigation.getParam('names').reduce((obj, name) => {
          obj[name] = GenericTabScreen;
          return obj;
        }, {})
      ),
    };
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.state.sceneMap}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      />
    );
  }
}

let AppContainer = createAppContainer(
  createStackNavigator(
    { Home: HomeScreen, Tabs: TabsScreen },
    { defaultNavigationOptions: { title: '"Dynamic" tabs with TabView' } }
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
