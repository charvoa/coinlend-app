import React from 'react';
import { Button, View, Text } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { FormattedProvider } from 'react-native-globalize';

import RootTab from './screens/RootTab';

export default class App extends React.Component {
  render() {
    return (
      <FormattedProvider locale="en">
      <RootTab />
    </FormattedProvider>
    );
  }
}
