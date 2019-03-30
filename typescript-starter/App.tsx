import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import greet from './greet';
import { Haptic } from 'expo';

export default class App extends React.Component {
  componentDidMount() {
    greet();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Vibrate!"
          onPress={() =>
            Haptic.impact(Haptic.ImpactFeedbackStyle.Medium)
          }
        />
        <Text>Open up App.js to start working on your app!</Text>
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
});
