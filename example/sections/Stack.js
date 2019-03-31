import * as React from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  Header,
  NavigationActions,
  HeaderBackButton,
} from 'react-navigation';
import words from '../words';

class ScreenA extends React.Component {
  static navigationOptions = {
    // title: 'A',
    // headerTintColor: '#fff',
    // headerStyle: {
    //   backgroundColor: '#000',
    // },
    // headerBackground: <View style={{ backgroundColor: '#000', flex: 1 }} />,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Screen A</Text>
        <Button
          title="Navigate to Screen B"
          onPress={() => this.props.navigation.navigate('B')}
        />
        {/* <Button
          title="Navigate to Screen D"
          onPress={() => this.props.navigation.navigate('D')}
        /> */}
        {/* <StatusBar barStyle="light-content" /> */}
      </View>
    );
  }
}

class ScreenB extends React.Component {
  static navigationOptions = {
    // headerBackground: <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.8)'}} />
  };

  // componentWillUnmount() {
  //   alert('unmounting screen B!');
  // }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 15 /* paddingTop: 15 + Header.HEIGHT */ }}>
          <Text>Screen B</Text>
          <Text>{words}</Text>
          <Button
            title="Navigate to Screen C"
            onPress={() => this.props.navigation.navigate('C')}
          />
        </View>
        {/* <StatusBar barStyle="default" /> */}
      </ScrollView>
    );
  }
}

class ScreenC extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let headerHidden = navigation.getParam('headerHidden');

    return {
      ...(headerHidden && { header: null }),
      headerRight: (
        <Button
          title="Hide header"
          onPress={() => navigation.setParams({ headerHidden: true })}
        />
      ),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Screen C</Text>
        {this.props.navigation.getParam('headerHidden') ? (
          <Button
            title="Show header"
            onPress={() =>
              this.props.navigation.setParams({ headerHidden: false })
            }
          />
        ) : null}
        <Button
          title="Navigate to Screen A"
          onPress={() => this.props.navigation.navigate('A')}
        />
        <Button
          title="Navigate to Screen B"
          onPress={() => this.props.navigation.navigate('B')}
        />
        <Button
          title="Navigate to Screen C"
          onPress={() => this.props.navigation.navigate('C')}
        />
        <Button
          title="Push Screen C"
          onPress={() => this.props.navigation.push('C')}
        />
        <Button
          title="Go back twice"
          onPress={() => {
            this.props.navigation.goBack();
            this.props.navigation.goBack();
            // this.props.navigation.goBack(null);
            // this.props.navigation.goBack(null);
            // this.props.navigation.pop();
            // this.props.navigation.pop();
          }}
        />
        <Button
          title="Navigate to A0"
          onPress={() =>
            this.props.navigation.navigate({ routeName: 'A', key: 'A0' })
          }
        />
        <Button
          title="Navigate to A1"
          onPress={() =>
            this.props.navigation.navigate({ routeName: 'A', key: 'A1' })
          }
        />
        {/* <StatusBar barStyle="default" /> */}
      </View>
    );
  }
}

class ScreenD extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // You probably don't need this here!
    let currentRouteIndex = navigation
      .dangerouslyGetParent()
      .state.routes.indexOf(navigation.state);

    if (currentRouteIndex > 0) {
      let canGoBack = navigation.getParam('canGoBack');
      return {
        gesturesEnabled: canGoBack,
        headerLeft: props => (
          <HeaderBackButton {...props} disabled={!canGoBack} />
        ),
      };
    }
  };

  render() {
    let canGoBack = this.props.navigation.getParam('canGoBack');

    return (
      <View style={styles.container}>
        {canGoBack ? (
          <Text>Ok, go ahead!</Text>
        ) : (
          <Button
            title="Enable back"
            onPress={() => this.props.navigation.setParams({ canGoBack: true })}
          />
        )}
      </View>
    );
  }
}

let Stack = createStackNavigator(
  {
    A: ScreenA,
    B: ScreenB,
    C: {
      screen: ScreenC,
      // params: {
      //   headerHidden: true,
      // }
    },
    D: {
      screen: ScreenD,
      params: {
        canGoBack: false,
      },
    },
  },
  {
    initialRouteName: 'A',
    initialRouteKey: 'A0',
    // cardOverlayEnabled: true,
    // cardShadowEnabled: false,
    // headerBackTitleVisible: true,
    // headerMode: 'screen', // | 'float' | 'none'
    // mode: 'modal',
    // headerBackgroundTransitionPreset: 'fade', // | translate | toggle
    // headerTransitionPreset: 'uikit',
    defaultNavigationOptions: {
      title: 'Untitled',
      // headerTransparent: true,
    },
    // defaultNavigationOptions: ({ navigation }) => ({
    //   title: navigation.state.routeName,
    // }),
  }
);

let originalGetStateForAction = Stack.router.getStateForAction;
Stack.router.getStateForAction = (action, state) => {
  // We only care about the back action
  if (action.type === NavigationActions.BACK) {
    let activeIndex = state.index;
    let activeRoute = state.routes[activeIndex];
    if (activeRoute.routeName === 'D' && !activeRoute.params.canGoBack) {
      alert('cannot go back until you complete the form!');
      return null;
    }
  }

  return originalGetStateForAction(action, state);
};

let StackAppContainer = createAppContainer(Stack);
export default StackAppContainer;

// export default class StackApp extends React.Component {
//   render() {
//     return (
//       <StackAppContainer
//         onNavigationStateChange={state => console.log(state)}
//       />
//     );
//   }
// }

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
