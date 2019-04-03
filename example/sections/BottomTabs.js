import * as React from 'react';
import {
  Button,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  createAppContainer,
  createBottomTabNavigator,
  withNavigationFocus,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import words from '../words';

class ScreenA extends React.Component {
  static navigationOptions = {
    // tabBarIcon: ({ focused, tintColor, horizontal }) => (
    //   <Ionicons name="ios-walk" size={horizontal ? 20 : 25} color={tintColor} />
    // ),
    // tabBarLabel: 'Walk',
  };

  componentDidMount() {
    console.log('mount screen A');
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <SafeAreaView /* currently doesn't handle notch on android! */>
          <Text>Screen A</Text>
          <Text>{words}</Text>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

class ScreenB extends React.Component {
  static navigationOptions = {
    // tabBarIcon: ({ focused, tintColor, horizontal }) => (
    //   <Ionicons
    //     name="ios-bicycle"
    //     size={horizontal ? 20 : 25}
    //     color={tintColor}
    //   />
    // ),
    // tabBarLabel: 'Bicycle',
  };

  constructor(props) {
    super(props);

    // Automatically unsubscribed
    //
    props.navigation.addListener('didFocus', () => {
      console.log('did focus B');
    });
    props.navigation.addListener('didBlur', () => {
      console.log('did blur B');
    });
  }

  componentDidMount() {
    console.log('mount screen B');
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>Screen B</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

@withNavigationFocus
class ScreenC extends React.Component {
  static navigationOptions = {
    // tabBarIcon: ({ focused, tintColor, horizontal }) => (
    //   <Ionicons name="ios-car" size={horizontal ? 20 : 25} color={tintColor} />
    // ),
    // tabBarLabel: 'Drive',
  };

  componentDidMount() {
    console.log('mount screen C');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      console.log(
        `screen c ${
          this.props.isFocused ? 'has regained focus' : 'was blurred'
        }`
      );
    }
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>
          Screen C: {this.props.isFocused ? 'focused' : 'not focused'}
        </Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

let Tabs = createBottomTabNavigator(
  {
    A: ScreenA,
    B: ScreenB,
    C: ScreenC,
  },
  {
    // backBehavior: 'history', // 'none' | 'history' | 'order' | 'initialRoute'
    // tabBarOptions: {
    //   // activeTintColor: 'red',
    //   // inactiveTintColor: '#fff',
    //   // showLabel: false,
    //   // showIcon: false,
    //   // style: {
    //   //   backgroundColor: '#000',
    //   // },
    // },
    defaultNavigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarOnPress: ({ defaultHandler, navigation }) => {
        console.log(`press: ${navigation.state.routeName}`);
        defaultHandler();
      },
      tabBarOnLongPress: ({ defaultHandler, navigation }) => {
        console.log(`long press: ${navigation.state.routeName}`);
        defaultHandler();
      },
    },
  }
);

export default createAppContainer(Tabs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height,
    paddingHorizontal: 15,
  },
  paragraph: {
    marginBottom: 10,
  },
});
