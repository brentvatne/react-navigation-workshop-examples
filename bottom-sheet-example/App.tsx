import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome Home!</Text>
      </View>
    );
  }
}

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Search screen!</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Your profile goes here!</Text>
      </View>
    );
  }
}

const Home = createStackNavigator(
  { HomeScreen },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor as string}
          name="home-circle"
          size={25}
        />
      ),
    },
  }
);
const Search = createStackNavigator(
  { SearchScreen },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor as string}
          name="database-search"
          size={25}
        />
      ),
    },
  }
);
const Profile = createStackNavigator(
  { ProfileScreen },
  {
    navigationOptions: ({ screenProps }) => ({
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          color={tintColor as string}
          name="face-profile"
          size={25}
        />
      ),
      tabBarOnLongPress: () => {
        screenProps.showProfileSwitcher();
      },
    }),
  }
);

const Tabs = createBottomTabNavigator({
  Home,
  Search,
  Profile,
});

const Navigation = createAppContainer(Tabs);

const { greaterOrEq, cond } = Animated;

class ProfileSwitcher extends React.Component {
  sheetRef: React.RefObject<BottomSheet> = React.createRef();

  renderContent = () => {
    return (
      <View
        style={{
          padding: 20,
          height: Dimensions.get('window').height,
          backgroundColor: '#fff',
        }}>
        <Text style={{ fontSize: 22 }}>Hello this is some content!</Text>
        <Text style={{ fontSize: 22, marginTop: 20 }}>More of it here</Text>
        <Text style={{ fontSize: 22, marginTop: 40 }}>And down here</Text>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.panelHandle} />
      </View>
    );
  };

  show = () => {
    this.sheetRef.current && this.sheetRef.current.snapTo(0);
  };

  hide = () => {
    this.sheetRef.current && this.sheetRef.current.snapTo(1);
  };

  sheetOpenValue = new Animated.Value(1);
  overlayOpacity = Animated.interpolate(this.sheetOpenValue, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  pointerEvents = cond(greaterOrEq(0.9, this.sheetOpenValue), 'auto', 'none');

  handleTapStateChange = ({
    nativeEvent,
  }: {
    nativeEvent: { state: State };
  }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.hide();
    }
  };

  render() {
    return (
      <React.Fragment>
        <TapGestureHandler onHandlerStateChange={this.handleTapStateChange}>
          <Animated.View
            pointerEvents={
              Platform.OS === 'android' ? 'none' : this.pointerEvents
            }
            style={[
              StyleSheet.absoluteFill,
              { opacity: this.overlayOpacity, backgroundColor: 'black' },
            ]}
          />
        </TapGestureHandler>
        <BottomSheet
          ref={this.sheetRef}
          overdragResistanceFactor={8}
          enabledInnerScrolling={false}
          snapPoints={[350, 0]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.sheetOpenValue}
        />
      </React.Fragment>
    );
  }
}

export default class App extends React.Component {
  profileSwitcherRef: React.RefObject<ProfileSwitcher> = React.createRef();

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigation
          screenProps={{
            showProfileSwitcher: () =>
              this.profileSwitcherRef.current &&
              this.profileSwitcherRef.current.show(),
          }}
        />
        <ProfileSwitcher ref={this.profileSwitcherRef} />
      </View>
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
  header: {
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelHandle: {
    width: 35,
    height: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 0,
  },
});
