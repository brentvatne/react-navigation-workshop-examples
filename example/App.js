import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Sections from './sections';

export default class App extends React.Component {
  state = {
    activeSection: 'Stack',
  };

  render() {
    if (this.state.activeSection) {
      let Section = Sections[this.state.activeSection];
      return <Section />;
    }
    return (
      <View style={styles.container}>
        <Button
          title="Go to stack example"
          onPress={() => this.setState({ activeSection: 'Stack' })}
        />
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
