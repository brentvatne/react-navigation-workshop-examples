import * as React from 'react';
import {
  Animated,
  Button,
  Platform,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  StackViewTransitionConfigs,
} from 'react-navigation';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import SearchLayout from 'react-navigation-addon-search-layout';
import { Ionicons } from '@expo/vector-icons';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <BorderlessButton
        onPress={() => navigation.navigate('Search')}
        style={{ marginRight: 15 }}>
        <Ionicons
          name="md-search"
          size={Platform.OS === 'ios' ? 22 : 25}
          color={SearchLayout.DefaultTintColor}
        />
      </BorderlessButton>
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello there!</Text>
      </View>
    );
  }
}

class ResultScreen extends React.Component {
  static navigationOptions = {
    title: 'Result',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.getParam('text')} result!</Text>
      </View>
    );
  }
}

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    searchText: null,
  };

  _handleQueryChange = searchText => {
    this.setState({ searchText });
  };

  _executeSearch = () => {
    alert('do search!');
  };

  render() {
    let { searchText } = this.state;

    return (
      <SearchLayout
        onChangeQuery={this._handleQueryChange}
        onSubmit={this._executeSearch}>
        {searchText ? (
          <RectButton
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: '#eee',
              paddingVertical: 20,
              paddingHorizontal: 15,
            }}
            onPress={() =>
              this.props.navigation.navigate('Result', {
                text: this.state.searchText,
              })
            }>
            <Text style={{ fontSize: 14 }}>{searchText}!</Text>
          </RectButton>
        ) : null}
      </SearchLayout>
    );
  }
}

let SearchStack = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen,
  },
  {
    transitionConfig: () => StackViewTransitionConfigs.NoAnimation,
    navigationOptions: {
      header: null,
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
);

let MainStack = createStackNavigator({
  Feed: SearchStack,
  Result: ResultScreen,
});

export default createAppContainer(MainStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
