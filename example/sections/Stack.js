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
        {/* <StatusBar barStyle="light-content" /> */}
      </View>
    );
  }
}

class ScreenB extends React.Component {
  static navigationOptions = {
    // headerBackground: <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.8)'}} />
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 15, /* paddingTop: 15 + Header.HEIGHT */ }}>
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
        {/* <StatusBar barStyle="default" /> */}
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
  },
  {
    initialRouteName: 'A',
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
  }
);

export default createAppContainer(Stack);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
