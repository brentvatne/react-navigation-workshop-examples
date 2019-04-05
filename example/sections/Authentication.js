import React from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Placeholder extends React.Component {
  static navigationOptions = {
    title: 'Untitled',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.state.routeName}</Text>
      </View>
    );
  }
}

const Home = createStackNavigator(
  { Home: Placeholder },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor}
          name="home-circle"
          size={25}
        />
      ),
    },
  }
);
const Search = createStackNavigator(
  { Search: Placeholder },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor}
          name="database-search"
          size={25}
        />
      ),
    },
  }
);
const Profile = createStackNavigator(
  { Profile: Placeholder },
  {
    navigationOptions: ({ screenProps }) => ({
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor}
          name="face-profile"
          size={25}
        />
      ),
    }),
  }
);

const Tabs = createBottomTabNavigator({
  Home,
  Search,
  Profile,
});

class LoadingScreen extends React.Component {
  componentDidMount() {
    this._loadUserAsync();
  }

  _loadUserAsync = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (false) {
      // if the user is found, go to tabs
      this.props.navigation.navigate('Tabs');
    } else {
      // otherwise force sign in
      this.props.navigation.navigate('Authentication');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

class AuthenticationScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Log in!"
          onPress={() => this.props.navigation.navigate('Tabs')}
        />
      </View>
    );
  }
}

const RootSwitch = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Authentication: AuthenticationScreen,
    Tabs,
  },
  {
    initialRouteName: 'Loading',
  }
);

export default createAppContainer(RootSwitch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
