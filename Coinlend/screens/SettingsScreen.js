import React from 'react';
import { Button, View, Text } from 'react-native';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

module.exports = SettingsScreen;