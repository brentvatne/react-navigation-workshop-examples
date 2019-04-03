import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import * as Sections from './sections';

class Button extends React.Component {
  render() {
    return (
      <RectButton
        style={{
          backgroundColor: '#eee',
          borderRadius: 5,
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          paddingVertical: 10,
          marginHorizontal: 20,
        }}
        onPress={this.props.onPress}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}>
          {this.props.title}
        </Text>
      </RectButton>
    );
  }
}

export default class App extends React.Component {
  state = {
    activeSection: null,
  };

  render() {
    if (this.state.activeSection) {
      let Section = Sections[this.state.activeSection];
      return <Section />;
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 20,
            fontWeight: '600',
            fontSize: 35,
            textAlign: 'left',
          }}>
          Examples
        </Text>
        <Button
          title="Stack"
          onPress={() => this.setState({ activeSection: 'Stack' })}
        />
        <Button
          title="Search"
          onPress={() => this.setState({ activeSection: 'Search' })}
        />
        <Button
          title="Bottom tabs"
          onPress={() => this.setState({ activeSection: 'BottomTabs' })}
        />
        <Button
          title="Nesting"
          onPress={() => this.setState({ activeSection: 'Nesting' })}
        />
        <Button
          title="Material top tabs"
          onPress={() => this.setState({ activeSection: 'MaterialTopTabs' })}
        />
        <Button
          title="Drawer"
          onPress={() => this.setState({ activeSection: 'Drawer' })}
        />
        <Button
          title="Dynamic tabs detached navigator"
          onPress={() => this.setState({ activeSection: 'DynamicTabs' })}
        />
        <Button
          title="Dynamic tabs with tab view"
          onPress={() => this.setState({ activeSection: 'TabView' })}
        />
        <Button
          title="Themes"
          onPress={() => this.setState({ activeSection: 'Themes' })}
        />
        <Button
          title="Bottom sheet"
          onPress={() => this.setState({ activeSection: 'BottomSheet' })}
        />
        <StatusBar hidden={false} barStyle="default" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingVertical: 50,
  },
});
