import * as React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  BottomTabBar,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const ThemeConstants = {
  light: {
    barBackgroundColor: '#fff',
    backgroundColor: '#fff',
    buttonColor: '#007aff',
    inactiveButtonColor: '#ccc',
    textColor: '#000',
  },
  dark: {
    barBackgroundColor: '#2B2B2B',
    barBorderColor: '#181818',
    backgroundColor: '#4C4C4C',
    buttonColor: '#fff',
    inactiveButtonColor: '#646464',
    textColor: '#fff',
  },
};

let ThemeContext = React.createContext(null);

class ThemedBottomTabBar extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <BottomTabBar
            {...this.props}
            activeTintColor={ThemeConstants[theme].buttonColor}
            inactiveTintColor={ThemeConstants[theme].inactiveButtonColor}
            style={{
              backgroundColor: ThemeConstants[theme].barBackgroundColor,
            }}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}

class ThemedText extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Text
            {...this.props}
            style={[
              { color: ThemeConstants[theme].textColor },
              this.props.style,
            ]}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}

class ThemedView extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <View
            {...this.props}
            style={[
              { backgroundColor: ThemeConstants[theme].backgroundColor },
              this.props.style,
            ]}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}

class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Button color={ThemeConstants[theme].buttonColor} {...this.props} />
        )}
      </ThemeContext.Consumer>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <ThemedView style={styles.container}>
        <ThemedButton
          title="Toggle theme"
          onPress={() => this.props.screenProps.toggleDarkMode()}
        />
      </ThemedView>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={{ fontSize: 20 }}>Hi there :) 😂</ThemedText>
      </ThemedView>
    );
  }
}

const DefaultStackOptions = ({ navigation, screenProps }) => {
  let defaults = {
    title: 'Untitled',
  };
  if (screenProps.theme === 'light') {
    return {
      ...defaults,
    };
  } else if (screenProps.theme === 'dark') {
    return {
      ...defaults,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: ThemeConstants.dark.barBackgroundColor,
        borderBottomColor: ThemeConstants.dark.barBorderColor,
      },
    };
  }
};

let HomeStack = createStackNavigator(
  {
    Home,
  },
  {
    cardStyle: {
      backgroundColor: '#000',
    },
    defaultNavigationOptions: DefaultStackOptions,
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: 'Home',
      tabBarIcon: ({ horizontal, tintColor }) => (
        <Ionicons
          name="ios-home"
          size={horizontal ? 20 : 25}
          color={tintColor}
        />
      ),
    }),
  }
);

let ProfileStack = createStackNavigator(
  {
    Profile,
  },
  {
    cardStyle: {
      backgroundColor: '#000',
    },
    defaultNavigationOptions: DefaultStackOptions,
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarLabel: 'Profile',
      tabBarIcon: ({ horizontal, tintColor }) => (
        <Ionicons
          name="ios-person"
          size={horizontal ? 20 : 25}
          color={tintColor}
        />
      ),
    }),
  }
);

// TODO: bottom tabs should read tabBarOptions from navigationOptions too
let Tabs = createBottomTabNavigator(
  {
    HomeStack,
    ProfileStack,
  },
  {
    tabBarComponent: ThemedBottomTabBar,
  }
);

let Navigation = createAppContainer(Tabs);

export default class App extends React.Component {
  state = {
    theme: 'light',
  };

  _toggleDarkMode = () => {
    this.setState({
      theme: this.state.theme === 'light' ? 'dark' : 'light',
    });
  };

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Navigation
          screenProps={{
            theme: this.state.theme,
            toggleDarkMode: this._toggleDarkMode,
          }}
        />
        <StatusBar
          barStyle={this.state.theme === 'light' ? 'default' : 'light-content'}
        />
      </ThemeContext.Provider>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
