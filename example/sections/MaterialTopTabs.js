import * as React from 'react';
import { Button, StyleSheet, StatusBar, View, Text } from 'react-native';
import {
  MaterialTopTabBar,
  SafeAreaView,
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';

class MaterialTopTabBarWrapper extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: '#2196f3' }}
        forceInset={{ top: 'always', horizontal: 'never', bottom: 'never' }}>
        <MaterialTopTabBar {...this.props} />
      </SafeAreaView>
    );
  }
}

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
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

let Tabs = createMaterialTopTabNavigator(
  {
    A: GenericTabScreen,
    B: GenericTabScreen,
    C: GenericTabScreen,
  },
  {
    tabBarComponent: MaterialTopTabBarWrapper,
  }
);

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
