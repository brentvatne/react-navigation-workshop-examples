import * as React from 'react';
import {
  Button,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Camera, Constants, Permissions } from 'expo';
import words from '../words';

async function canUseCameraAsync() {
  let { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status === 'granted';
}

class ScreenA extends React.Component {
  static navigationOptions = {
    title: 'Screen A',
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text>{words}</Text>
        <Button
          title="Go to A1"
          onPress={() => this.props.navigation.navigate('A1')}
        />
      </ScrollView>
    );
  }
}

class ScreenA1 extends React.Component {
  static navigationOptions = {
    title: 'Screen A1',
  };

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text>Under the tabs!</Text>
      </View>
    );
  }
}

class ScreenB extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor, horizontal }) => (
      <Ionicons
        name="ios-camera"
        size={horizontal ? 25 : 30}
        color={tintColor}
      />
    ),
    tabBarOnPress: async ({ navigation }) => {
      if (await canUseCameraAsync()) {
        navigation.navigate('Camera');
      } else {
        alert('You need to give the app permissions to use the camera');
      }
    },
  };

  render() {
    return null;
  }
}

class ScreenC extends React.Component {
  static navigationOptions = {
    title: 'Screen C',
  };

  render() {
    return (
      <View style={styles.contentContainer}>
        <Button
          title="Go to Screen D"
          onPress={() => this.props.navigation.navigate('D')}
        />
        <Button
          title="Go to Screen E"
          onPress={() => this.props.navigation.navigate('E')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        {/* <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack(null)}
        /> */}
      </View>
    );
  }
}

class ScreenD extends React.Component {
  static navigationOptions = {
    title: 'Screen D',
  };

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text>On top of the tabs!</Text>
      </View>
    );
  }
}

class ScreenE extends React.Component {
  static navigationOptions = {
    title: 'Screen E',
  };

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text>On top of the tabs, in a separate stack!</Text>
        <Button
          title="Push another one!"
          onPress={() => this.props.navigation.push('E')}
        />
      </View>
    );
  }
}

class CameraScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} />
        {Constants.isDevice ? null : (
          <View
            style={[
              StyleSheet.absoluteFill,
              { alignItems: 'center', justifyContent: 'center' },
            ]}>
            <Text style={{ color: '#fff' }}>No camera in simulator 😅</Text>
          </View>
        )}
        <View style={{ position: 'absolute', top: 20, left: 25 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}>
            <Ionicons size={40} name="ios-close" color="#fff" />
          </TouchableOpacity>
        </View>
        <StatusBar hidden />
      </View>
    );
  }
}

let StackA = createStackNavigator(
  { A: ScreenA, A1: ScreenA1 },
  {
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor, horizontal }) => (
        <Ionicons
          name="ios-home"
          size={horizontal ? 20 : 25}
          color={tintColor}
        />
      ),
    },
  }
);

let StackC = createStackNavigator(
  { C: ScreenC },
  {
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor, horizontal }) => (
        <Ionicons
          name="ios-settings"
          size={horizontal ? 20 : 25}
          color={tintColor}
        />
      ),
    },
  }
);

let StackE = createStackNavigator({ E: ScreenE });

let Tabs = createBottomTabNavigator(
  {
    A: StackA,
    B: ScreenB,
    C: StackC,
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  }
);

let Main = createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  D: ScreenD,
});

let Root = createStackNavigator(
  {
    Main,
    E: StackE,
    Camera: CameraScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(Root);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
