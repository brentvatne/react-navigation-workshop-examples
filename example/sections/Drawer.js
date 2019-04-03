import * as React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';

class GenericDrawerScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.props.navigation.state.routeName}
        </Text>
        <Button
          title="Open drawer"
          onPress={() => this.props.navigation.openDrawer()}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

let Drawer = createDrawerNavigator({
  A: GenericDrawerScreen,
  B: GenericDrawerScreen,
  C: GenericDrawerScreen,
});

export default createAppContainer(Drawer);

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
